import { useState, useEffect } from 'react';
import { hashString } from '../../../utils/cryptography';

export default function useHashString(inputString: string) {
    
    const [hashBase64, setHashBase64] = useState<string | null>(null);
    
    // Run the asynchronous function inside a useEffect hook
    useEffect(() => {
        const generateHash = async () => {
            if(inputString) {
                const hashBase64 = await hashString(inputString);
                setHashBase64(hashBase64);
            }
        }
        generateHash();
    }, [inputString]); // Recalculate when inputString changes
    
    return hashBase64;
}
