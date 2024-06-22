import { useContractRead } from 'wagmi'
import { ERCKMS1_ABI } from '../../../../constants/abis'
import { ERCKMS1_ADDRESS } from '../../../../constants/addreses'
import { useAccount } from 'wagmi'

export default function useGetKeys() {

    const { address } = useAccount()

    const { data, isError, isLoading, isSuccess }: any = useContractRead({
        address: ERCKMS1_ADDRESS,
        abi: ERCKMS1_ABI,
        watch: true,
        functionName: 'getKeys',
        args: [address]
    })

    return { data, isError, isLoading, isSuccess }
}