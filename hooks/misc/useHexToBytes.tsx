import { useState, useEffect } from 'react'
import { hashSignature } from '../../utils/cryptography'
import { hexToBytes, keccak256, toBytes, toHex } from 'viem'

export default function useHexToBytes(hex: `0x${string}`) {
    
    const [bytes, setBytes] = useState<Uint8Array | null>(null)
    
    // Run the asynchronous function inside a useEffect hook
    useEffect(() => {
      const generateHash = async () => {
        try{
          if(hex){
            const toBytesData = hexToBytes(hex)
            setBytes(toBytesData) 
          }
        }
        catch{
          setBytes(null) 
        }
      }
      generateHash()
    }, [hex]) // Recalculate when signature changes
    
    return bytes
  }
  