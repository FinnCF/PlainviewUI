import { useState, useEffect } from 'react';
import { bytesToString, hexToBytes } from 'viem';
import { decryptBytesWithAESKey, decryptBytesWithPrivateRSAKey } from '../../../utils/cryptography';

export default function useDecryptFilesWithPrivateKey(privateRSAKey: Uint8Array, files: Array<any>) {

    const [decryptedFiles, setDecryptedFiles] = useState<Array<any> | null>(null);

    useEffect(() => {
        const performDecryption = async () => {
            let decryptedFiles = files
            if (privateRSAKey && files) {
                for (let i = 0; i < files.length; i++) {
                    try {
                        const encryptedAESKeyBytes = hexToBytes(files?.[i]?.encryptedAESKey)
                        decryptedFiles[i].decryptedAESKey = await decryptBytesWithPrivateRSAKey(privateRSAKey, encryptedAESKeyBytes);

                        const decryptedData = await decryptBytesWithAESKey(hexToBytes(decryptedFiles[i].encryptedData), hexToBytes(decryptedFiles[i].iv), decryptedFiles[i].decryptedAESKey);
                        decryptedFiles[i].decryptedData = decryptedData

                        const decryptedFolderBytes = await decryptBytesWithAESKey(hexToBytes(decryptedFiles[i].encryptedFolder), hexToBytes(decryptedFiles[i].iv), decryptedFiles[i].decryptedAESKey);
                        decryptedFiles[i].decryptedFolder = bytesToString(decryptedFolderBytes)

                        const decryptedKindBytes = await decryptBytesWithAESKey(hexToBytes(decryptedFiles[i].encryptedKind), hexToBytes(decryptedFiles[i].iv), decryptedFiles[i].decryptedAESKey);
                        decryptedFiles[i].decryptedKind = bytesToString(decryptedKindBytes)

                        const decryptedNameBytes = await decryptBytesWithAESKey(hexToBytes(decryptedFiles[i].encryptedName), hexToBytes(decryptedFiles[i].iv), decryptedFiles[i].decryptedAESKey);
                        decryptedFiles[i].decryptedName = bytesToString(decryptedNameBytes)

                    } catch (e) {
                        console.log(e)
                    }
                }
                setDecryptedFiles(decryptedFiles);
            }
        };
        performDecryption();
    }, [privateRSAKey, files?.length]);

    return decryptedFiles;
}
