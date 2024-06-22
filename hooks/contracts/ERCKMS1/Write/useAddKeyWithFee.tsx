import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { ERCKMS1_ABI } from '../../../../constants/abis'
import { ERCKMS1_ADDRESS } from '../../../../constants/addreses'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toHex } from 'viem'

export default function useAddKeyWithFee(publicKeyBase64, encryptedPrivateKeyBase64, ivBase64) {

  const router = useRouter()

  const [isSuccess, setIsSuccess] = useState(false);

  // Check if the keys are not null
  const keysAreValid = publicKeyBase64 && encryptedPrivateKeyBase64 && ivBase64;

  const { error, config } = usePrepareContractWrite({
    address: keysAreValid ? ERCKMS1_ADDRESS : null,
    abi: keysAreValid ? ERCKMS1_ABI : null,
    functionName: keysAreValid ? 'addKey' : null,
    args: keysAreValid ? [toHex(publicKeyBase64), toHex(encryptedPrivateKeyBase64), toHex(ivBase64)] : [],
    value: 1,
    enabled: keysAreValid
  })
  
  const { data, isLoading, isIdle, write } = useContractWrite({ ...config })

  const wait = useWaitForTransaction({
    hash: data?.hash,
    onSettled: () => {
        setIsSuccess(true);
        router.push('/')
    }
  })

  console.log(error)
  
  // If keys are not valid, you could provide a mock write function that does nothing
  const safeWrite = keysAreValid ? write : () => { console.warn('Attempted to write with invalid keys') };

  return { data, isLoading: wait.isLoading || isLoading, isIdle, isSuccess, write: safeWrite }
}
