import { useState, useEffect } from 'react'
import { keccak256, toBytes } from 'viem'

export default function useHashBytes(bytesData: Uint8Array) {
    
    const [hash, setHash] = useState<Uint8Array | null>(null)
    
    // Run the asynchronous function inside a useEffect hook
    useEffect(() => {
      const generateHash = async () => {
        if(bytesData){
          const hashGenerated = toBytes(keccak256(bytesData))
          setHash(hashGenerated) 
        }
      }
      generateHash()
    }, [bytesData]) // Recalculate when signature changes
    
    return hash
  }
  