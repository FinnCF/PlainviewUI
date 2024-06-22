import { useState, useEffect } from 'react';
import { decryptBytesWithPrivateRSAKey } from '../../../utils/cryptography';

export default function useDecryptBytesWithPrivateRSAKey(bytesData: Uint8Array, privateRSAKey: Uint8Array) {

  const [decryptedBytes, setDecryptedBytes] = useState<Uint8Array | null>(null);

  useEffect(() => {
    const generateDecryption = async () => {
      console.log(bytesData, privateRSAKey)
      if (bytesData && privateRSAKey) {
        try {
          const decryptedBytes = await decryptBytesWithPrivateRSAKey(privateRSAKey, bytesData);
          console.log(decryptedBytes)
          setDecryptedBytes(decryptedBytes);
        } catch (error) {
          console.error('Error in decryption:', error);
        }
      }
    };
    generateDecryption();
  }, [bytesData, privateRSAKey]);

  return decryptedBytes;
}