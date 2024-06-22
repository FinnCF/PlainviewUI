import { useState, useEffect } from 'react';
import { generateRSAKeyPair } from '../../../utils/cryptography';

// Define the RSA key pair shape
interface RSAKeyPair {
  publicRSAKey: Uint8Array | null;
  privateRSAKey: Uint8Array | null;
}

export default function useGenerateRSAKeyPair(): RSAKeyPair {
    
  const [rsaKeyPair, setRSAKeyPair] = useState<RSAKeyPair>({ 
      publicRSAKey: null, 
      privateRSAKey: null 
  });
  
  // Run the asynchronous function inside a useEffect hook
  useEffect(() => {
    const generateKey = async () => {
      const [publicRSAKeyGenerated, privateRSAKeyGenerated] = await generateRSAKeyPair();
      setRSAKeyPair({ 
          publicRSAKey: publicRSAKeyGenerated, 
          privateRSAKey: privateRSAKeyGenerated 
      });
    }
    generateKey();
  }, []); // Empty dependency array means this will run once on mount
  
  return rsaKeyPair;
}
