import { useState, useEffect } from 'react';
import { encryptBytesWithAES256 } from '../../../utils/cryptography';

export function useEncryptBytesWithAES256(
  aesKeySeed: Uint8Array,
  dataToEncrypt: Uint8Array,
  inputIv?: Uint8Array
) {
  const [encryptionData, setEncryptionData] = useState<{ encryptedData: Uint8Array, iv: Uint8Array } | null>({
    encryptedData: null,
    iv: null
  });

  useEffect(() => {
    const performEncryption = async () => {
      try {
        if (aesKeySeed && dataToEncrypt) {
          const result = await encryptBytesWithAES256(aesKeySeed, dataToEncrypt, inputIv);
          setEncryptionData(result); 
        }
      } catch (error) {
        console.error('Error during encryption:', error);
        setEncryptionData(null);
      }
    };
    performEncryption();
  }, [aesKeySeed, dataToEncrypt, inputIv]); // Notice the dependency array now includes inputIv

  return encryptionData;
}
