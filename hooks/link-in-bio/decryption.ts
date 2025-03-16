export async function decryptData(encryptedData: { data: string; iv: string; salt: string }) {
    // Retrieve the passphrase from sessionStorage
    const passphrase = localStorage.getItem("_key");

    if (!passphrase) {
        throw new Error("Passphrase is missing");
    }

    // Decode the Base64-encoded data (ciphertext, IV, and salt)
    const ciphertext = new Uint8Array(
        atob(encryptedData.data)
            .split("")
            .map((c) => c.charCodeAt(0))
    );
    const iv = new Uint8Array(
        atob(encryptedData.iv)
            .split("")
            .map((c) => c.charCodeAt(0))
    );
    const salt = new Uint8Array(
        atob(encryptedData.salt)
            .split("")
            .map((c) => c.charCodeAt(0))
    );

    // Encode the passphrase into a Uint8Array
    const passphraseBuffer = new TextEncoder().encode(passphrase);

    // Generate the key from the passphrase using PBKDF2
    const key = await crypto.subtle.importKey("raw", passphraseBuffer, { name: "PBKDF2" }, false, [
        "deriveKey",
    ]);

    const derivedKey = await crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: 100000,
            hash: "SHA-256",
        },
        key,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );

    // Decrypt the data
    const decryptedData = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: iv },
        derivedKey,
        ciphertext
    );

    // Convert the decrypted data back into a string
    const decodedData = new TextDecoder().decode(decryptedData);

    // Parse the decrypted string into a JSON object
    return JSON.parse(decodedData);
}
