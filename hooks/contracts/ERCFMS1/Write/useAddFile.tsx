import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { ERCFMS1_ABI } from '../../../../constants/abis'
import { ERCFMS1_ADDRESS } from '../../../../constants/addreses'
import { useState } from 'react';
import useBytesToHex from '../../../misc/useBytesToHex';

export default function useAddFile(encryptedData: Uint8Array, encryptedName: Uint8Array, encryptedFolder: Uint8Array, encryptedKind: Uint8Array, encryptedAESKey: Uint8Array, iv: Uint8Array, contentHash: Uint8Array) {

    const [isSuccess, setIsSuccess] = useState(false);
    const [isPrepared, setIsPrepared] = useState(true);

    const encryptDataHex = useBytesToHex(encryptedData)
    const encryptedNameHex = useBytesToHex(encryptedName)
    const encryptedFoldersHex = useBytesToHex(encryptedFolder)
    const encryptedKindHex = useBytesToHex(encryptedKind)
    const encryptedAESKeyHex = useBytesToHex(encryptedAESKey)
    const ivHex = useBytesToHex(iv)
    const contentHashHex = useBytesToHex(contentHash)

    const prepare = usePrepareContractWrite({
        address: ERCFMS1_ADDRESS,
        abi: ERCFMS1_ABI,
        functionName: 'addFile',
        args: [encryptDataHex, encryptedNameHex, encryptedFoldersHex, encryptedKindHex, encryptedAESKeyHex, ivHex, contentHashHex],
        onSuccess: () => {
            setIsPrepared(true)
        },
        onSettled: () => {
            setIsPrepared(true)
        },
    })

    const { data, error, isLoading, isIdle, isError, write, writeAsync } = useContractWrite({ ...prepare.config })
 
    const wait = useWaitForTransaction({
        hash: data?.hash,
        onSettled: () => {
            setIsSuccess(true);
        }
    })

    async function awaitIt(){
        await prepare.refetch()
     }
     awaitIt()

    return { data, isLoading, isError, error, isIdle, isSuccess, prepare, isPrepared, wait, write, writeAsync }
}
