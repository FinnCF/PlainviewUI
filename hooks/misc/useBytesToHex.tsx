import { useState, useEffect } from 'react';
import { bytesToHex } from 'viem';

export default function useBytesToHex(bytes: Uint8Array) {
    const [hex, setHex] = useState<string | null>(null);

    useEffect(() => {
      const convertToHex = () => {
        if(bytes){
          const hexData = bytesToHex(bytes);
          setHex(hexData); 
        }
        else{
          setHex(null)
        }
      }
      convertToHex();
    }, [bytes]); // Recalculate when bytes change
    
    return hex;
}
