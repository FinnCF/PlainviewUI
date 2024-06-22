import { useState, useEffect } from 'react'
import { hexToBytes, keccak256, stringToBytes, toBytes, toHex } from 'viem'

export default function useStringToBytes(inputString: string) {
    
    const [bytes, setBytes] = useState<Uint8Array | null>(null)
    
    // Run the asynchronous function inside a useEffect hook
    useEffect(() => {
      const convertToBytes = () => {
        if(inputString == ''){
          setBytes(null)
        }
        else if (inputString){
          const toBytesData = stringToBytes(inputString)
          setBytes(toBytesData) 
        }
      }
      convertToBytes()
    }, [inputString]) // Recalculate when inputString changes
    
    return bytes
}
