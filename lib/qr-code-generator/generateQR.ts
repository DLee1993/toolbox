// List of things this function has to accomplish

// - take data coming in and check the type
// - determine the correct string concatenation needed for each type
// - take all data and join it togther
// - return the new string

export const GenerateQrCode = ({
    value,
    type,
}: {
    value: { [key: string]: string };
    type: string;
}) => {
    // take the values and concatenate inside the if statements, then return the concatenated string
    if (type === "url") {
        const qrString = `${value.url}`;

        return qrString;
    }
    if (type === "vcard") {
        const { FirstName, LastName, Tel, Email, Company, Website } = value;

        // const qrString = `
        //     BEGIN:VCARD;VERSION:3.0;N:${LastName};${FirstName};FN:${FirstName} ${LastName};ORG:${Company};TEL;CELL:${Tel};EMAILWORK;INTERNET:${Email};URL:${Website};END:VCARD
        // `;
        const qrString = `BEGIN:VCARD;VERSION:3.0;FN:${FirstName}${LastName};TEL:${Tel};EMAIL:${Email};${Company};URL:${Website};END:VCARD`;

        return qrString.replace(/\s+/g, "");
    }
    if (type === "vevent") {
        console.log(value);
        return value;
    }
    if (type === "email") {
        const { Address, Subject, Body } = value;

        const qrString = `MATMSG:TO:${Address};SUB:${Subject};BODY:${Body};;`;

        console.log(qrString);

        return qrString;
    }
    if (type === "sms") {
        const { Number, Body } = value;

        const qrString = `sms:${Number}?body=${Body}`;

        return qrString;
    }
    if (type === "plainText") {
        const qrString = `${value.text}`;

        return qrString;
    }
    if (type === "wifi") {
        const { Network, NetworkPassword, EncryptionType, Hidden } = value;

        const qrString = `WIFI:T:${EncryptionType};S:${Network};P:${NetworkPassword};H:${Hidden};`;

        return qrString;
    }
    if (type === "location") {
        const { Latitude, Longitude } = value;

        const qrString = `GEO:${Latitude},${Longitude}`;

        return qrString;
    }

    return "";
};
