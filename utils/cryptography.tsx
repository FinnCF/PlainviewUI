import { AES_Bits, RSA_Bits, IV_Bits } from "../constants/cryptography";

export async function generateRSAKeyPair(): Promise<[Uint8Array, Uint8Array]> {
    try {
        const keyPair = await window.crypto.subtle.generateKey(
            {
                name: "RSA-OAEP",
                modulusLength: RSA_Bits,
                publicExponent: new Uint8Array([1, 0, 1]),
                hash: "SHA-256",
            },
            true,
            ["encrypt", "decrypt"]
        );        

        const publicKey = await window.crypto.subtle.exportKey('spki', keyPair.publicKey);
        const privateKey = await window.crypto.subtle.exportKey('pkcs8', keyPair.privateKey);

        return [new Uint8Array(publicKey), new Uint8Array(privateKey)];

    } catch (err) {
        console.error('Error generating key pair:', err);
        throw err;
    }
}

export async function hashSignature(signature: Uint8Array): Promise<Uint8Array> {
    try {
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', signature);
        return new Uint8Array(hashBuffer);
    } catch (err) {
        console.error('Error hashing signature:', err);
        throw err;
    }
}

export async function hashString(input: string): Promise<Uint8Array> {
    try {
        const inputAsUint8Array = new TextEncoder().encode(input);
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', inputAsUint8Array);
        return new Uint8Array(hashBuffer);
    } catch (err) {
        console.error('Error hashing the input string:', err);
        throw err;
    }
}

export async function encryptBytesWithAES256(
    aesKeyBytes: Uint8Array,
    data: Uint8Array,
    inputIv?: Uint8Array
): Promise<{ encryptedData: Uint8Array; iv: Uint8Array }> {
    try {
        const iv = inputIv || window.crypto.getRandomValues(new Uint8Array(IV_Bits/8));

        if (aesKeyBytes.length !== 32) {
            throw new Error('Passcode must be 32 bytes long (encryption)');
        }
        if (iv.length !== 16) {
            throw new Error('Initialization vector (iv) must be 16 bytes long');
        }

        const algorithm = {
            name: "AES-CBC",
            iv: iv,
        };

        const aesKey = await window.crypto.subtle.importKey('raw', aesKeyBytes, algorithm, false, ['encrypt']);
        const encryptedOutput = await window.crypto.subtle.encrypt(algorithm, aesKey, data);
        return { encryptedData: new Uint8Array(encryptedOutput), iv: iv };
    } catch (err) {
        console.error('Error encrypting data:', err);
        throw err;
    }
}

export async function decryptPrivateRSAKeyWithAES256(
    hashedSignature: Uint8Array,
    privateRSAKeyEncrypted: Uint8Array,
    iv: Uint8Array
): Promise<Uint8Array> {
    try {
        // Check the length of the hashedSignature
        if (hashedSignature.length !== 32) {
            throw new Error(`Hashed signature must be 32 bytes long (decryption). Current length: ${hashedSignature.length} bytes.`);
        }

        const algorithm = {
            name: "AES-CBC",
            iv: iv,
        };
        
        const aesKey = await window.crypto.subtle.importKey('raw', hashedSignature, algorithm, false, ['decrypt']);
        const privateRSAKeyDecrypted = await window.crypto.subtle.decrypt(algorithm, aesKey, privateRSAKeyEncrypted);
        return new Uint8Array(privateRSAKeyDecrypted);
    } catch (err) {
        console.error('Error decrypting private key:', err);
        throw err;
    }
}

export async function encryptBytesWithRandomAESKey(inputData: Uint8Array): Promise<{ encryptedData: Uint8Array; iv: Uint8Array; aesKey: Uint8Array }> {
    try {
        const iv = window.crypto.getRandomValues(new Uint8Array(IV_Bits / 8));
        const aesKey = await window.crypto.subtle.generateKey({ name: "AES-CBC", length: 256 }, true, ['encrypt']);
        const rawAesKey = await window.crypto.subtle.exportKey('raw', aesKey);
        const algorithm = { name: "AES-CBC", iv: iv };
        const encryptedData = await window.crypto.subtle.encrypt(algorithm, aesKey, inputData);
        return { encryptedData: new Uint8Array(encryptedData), iv: iv, aesKey: new Uint8Array(rawAesKey) };
    } catch (err) {
        console.error('Error encrypting data:', err);
        throw err;
    }
}

export async function decryptBytesWithAESKey(encryptedData: Uint8Array, iv: Uint8Array, rawAesKey: Uint8Array): Promise<Uint8Array> {
    try {
        if (rawAesKey.length !== 32) {
            throw new Error('AES key must be 32 bytes long (decryption)');
        }
        const algorithm = { name: "AES-CBC", iv: iv };
        const aesKey = await window.crypto.subtle.importKey('raw', rawAesKey, algorithm, false, ['decrypt']);
        const decryptedData = await window.crypto.subtle.decrypt(algorithm, aesKey, encryptedData);
        return new Uint8Array(decryptedData);
    } catch (err) {
        console.error('Error decrypting data:', err);
        throw err;
    }
}

export async function encryptBytesWithPublicRSAKey(publicKey: Uint8Array, dataToEncrypt: Uint8Array): Promise<Uint8Array> {
    try {
        const publicKeyImported = await window.crypto.subtle.importKey('spki', publicKey, { name: "RSA-OAEP", hash: { name: "SHA-256" } }, false, ['encrypt']);
        const encryptedData = await window.crypto.subtle.encrypt({ name: "RSA-OAEP" }, publicKeyImported, dataToEncrypt);
        return new Uint8Array(encryptedData);
    } catch (err) {
        console.error('Error encrypting data:', err);
        throw err;
    }
}


export async function decryptBytesWithPrivateRSAKey(privateKey: Uint8Array, encryptedData: Uint8Array): Promise<Uint8Array> {
    try {
        const privateKeyImported = await window.crypto.subtle.importKey('pkcs8', privateKey, { name: "RSA-OAEP", hash: { name: "SHA-256" } }, false, ['decrypt']);
        const decryptedDataBuffer = await window.crypto.subtle.decrypt({ name: "RSA-OAEP" }, privateKeyImported, encryptedData);
        return new Uint8Array(decryptedDataBuffer);
    } catch (err) {
        console.error('Error decrypting data:', err);
        throw err;
    }
}