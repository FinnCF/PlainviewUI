import { useState, useEffect } from 'react';
import { encryptBytesWithRandomAESKey } from '../../../utils/cryptography';

export default function useEncryptBytesWithRandomAES256(bytesData: Uint8Array) {
  const [encryptionData, setEncryptionData] = useState<{
    encryptedData: Uint8Array | null;
    iv: Uint8Array | null;
    aesKey: Uint8Array | null; 
  }>({ encryptedData: null, iv: null, aesKey: null });

  useEffect(() => {
    const generateEncryption = async () => {
      if (bytesData) {
        const { encryptedData, iv, aesKey } = await encryptBytesWithRandomAESKey(bytesData);
        setEncryptionData({ encryptedData, iv, aesKey });
      }
    };
    generateEncryption();
  }, [bytesData]);

  return encryptionData;
}
