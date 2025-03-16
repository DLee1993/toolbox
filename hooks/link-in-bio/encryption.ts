function generateRandomPassphrase(length = 32) {
    // Generate random bytes
    const randomBytes = new Uint8Array(length);

    crypto.getRandomValues(randomBytes);

    // Convert the bytes to a Base64 string (URL-safe)
    return btoa(String.fromCharCode.apply(null, Array.from(randomBytes)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

export async function encryptData(data: LinkInBioValues) {
    // Generate a random passphrase each time
    const passphrase = generateRandomPassphrase();

    // Convert the object data to a JSON string
    const serializedData = JSON.stringify(data);

    // Encode the passphrase into a Uint8Array
    const passphraseBuffer = new TextEncoder().encode(passphrase);

    // Generate a key from the passphrase using PBKDF2
    const salt = crypto.getRandomValues(new Uint8Array(16)); // Random salt for key derivation
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

    // Generate a random 12-byte IV (Initialization Vector)
    const iv = crypto.getRandomValues(new Uint8Array(12));

    // Encrypt the data using AES-GCM
    const encodedData = new TextEncoder().encode(serializedData);
    const encryptedData = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        derivedKey,
        encodedData
    );

    // Convert the encrypted data to a Base64 string
    const ciphertext = new Uint8Array(encryptedData);
    const base64Ciphertext = btoa(String.fromCharCode.apply(null, Array.from(ciphertext)));
    const base64Iv = btoa(String.fromCharCode.apply(null, Array.from(iv)));
    const base64Salt = btoa(String.fromCharCode.apply(null, Array.from(salt)));

    // Return the encrypted data (ciphertext, IV, and salt) along with the passphrase
    return {
        ciphertext: base64Ciphertext,
        iv: base64Iv,
        salt: base64Salt,
        passphrase: passphrase, // The random passphrase for decryption
    };
}
