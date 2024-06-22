import { useState, useEffect } from 'react';
import { encryptBytesWithPublicRSAKey } from '../../../utils/cryptography';

export default function useEncryptBytesWithPublicRSAKey(publicRSAKey: Uint8Array, bytesToEncrypt: Uint8Array) {

  const [encryptedBytes, setEncryptedBytesBase64] = useState<Uint8Array | null>(null);

  useEffect(() => {
    const performEncryption = async () => {
      if (publicRSAKey && bytesToEncrypt) {
        try {
          const encryptedData = await encryptBytesWithPublicRSAKey(publicRSAKey, bytesToEncrypt);
          setEncryptedBytesBase64(encryptedData);
        } catch (error) {
          setEncryptedBytesBase64(null);
          console.error('Error in encryption:', error);
        }
      }
    };
    performEncryption();
  }, [publicRSAKey, bytesToEncrypt]);

  return encryptedBytes ;
}
