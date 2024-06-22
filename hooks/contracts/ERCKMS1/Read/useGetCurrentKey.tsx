import { useContractRead } from 'wagmi'
import { ERCKMS1_ABI } from '../../../../constants/abis'
import { ERCKMS1_ADDRESS } from '../../../../constants/addreses'

export default function useGetCurrentKey(addressGiven) {

    const { data, error, isError, isLoading, isSuccess }: any = useContractRead({
        address: ERCKMS1_ADDRESS,
        abi: ERCKMS1_ABI,
        functionName: 'getCurrentKey',
        args: [addressGiven]
    })

    return { data, error, isError, isLoading, isSuccess }
}