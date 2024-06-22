import { useContractRead } from 'wagmi'
import { ERCFMS1_ABI } from '../../../../constants/abis'
import { ERCFMS1_ADDRESS } from '../../../../constants/addreses'
import { useAccount } from 'wagmi'

export default function useGetUserFiles() {

    const { address } = useAccount()

    const { data, isError, isLoading, isSuccess }: any = useContractRead({
        address: ERCFMS1_ADDRESS,
        abi: ERCFMS1_ABI,
        watch: true,
        functionName: 'getUserFiles',
        args: [address]
    })

    return { data, isError, isLoading, isSuccess }
}