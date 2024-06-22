import { useState, useEffect } from 'react';
import { bytesToString } from 'viem';

export default function useBytesToString(bytes: Uint8Array) {
    const [stringValue, setStringValue] = useState<string | null>(null);

    useEffect(() => {
      const convertToString = () => {
        if(bytes){
          const resultString = bytesToString(bytes);
          setStringValue(resultString); 
        }
      }
      convertToString();
    }, [bytes]); // Recalculate when bytes change
    
    return stringValue;
}
