import { useState, useEffect } from 'react';
import { decryptBytesWithAESKey } from '../../../utils/cryptography';

/**
 * A React hook to decrypt bytes using AES-256 encryption.
 * 
 * @param {Uint8Array} encryptedData - The data that needs to be decrypted.
 * @param {Uint8Array} iv - Initialization vector used for decryption.
 * @param {Uint8Array} keySeed - The AES key seed for decryption.
 * 
 * @returns {Uint8Array | null} - The decrypted data or null.
 */
export function useDecryptBytesWithAES256(
  encryptedData: Uint8Array,
  iv: Uint8Array,
  keySeed: Uint8Array
): Uint8Array | null {

  const [decryptionResult, setDecryptionResult] = useState<Uint8Array | null>(null);

  useEffect(() => {
    const performDecryption = async () => {
      try {
        if (encryptedData && iv && keySeed) {
          const decryptedData = await decryptBytesWithAESKey(encryptedData, iv, keySeed);
          setDecryptionResult(decryptedData);
        }
      } catch (error) {
        console.error('Error during decryption:', error);
        setDecryptionResult(null);
      }
    };
    performDecryption();
  }, [encryptedData, iv, keySeed]);

  return decryptionResult;
}
