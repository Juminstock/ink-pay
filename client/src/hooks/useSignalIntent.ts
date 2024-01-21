import { BoomieRampABI } from '@/lib/contracts/BoomieRampABI'
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi'

const boomieRampContract =
  (import.meta.env.VITE_BOOMIE_RAMP_CONTRACT_SEPOLIA as `0x${string}`) ?? ''

const decimals = 10e18

export const useSignalIntent = (
  depositId: `0x${string}`,
  amount: number,
  to: `0x${string}`
) => {
  const {
    config,
    error: prepareSignalIntentError,
    isError: isPrepareSignalIntentError
  } = usePrepareContractWrite({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: 'signalIntent',
    args: [depositId, BigInt(amount * decimals), to],
    onSettled (data, error) {
      console.log('Settled Prepare signalIntent:', { data, error })
    }
  })

  const {
    data: signalIntentData,
    error: signalIntentError,
    isError: isSignalIntentError,
    status: signalIntentStatus,
    write: signalIntentWrite
  } = useContractWrite({
    ...config,
    onSettled (data, error) {
      console.log('Settled signalIntent:', { data, error })
    }
  })

  const {
    data: signalIntentTxn,
    isLoading: isLoadingSignalIntentTxn,
    isSuccess: isSignalIntentTxnSuccess
  } = useWaitForTransaction({ hash: signalIntentData?.hash })

  return {
    isLoadingSignalIntentTxn,
    isPrepareSignalIntentError,
    isSignalIntentError,
    isSignalIntentTxnSuccess,
    prepareSignalIntentError,
    signalIntentWrite,
    signalIntentError,
    signalIntentStatus,
    signalIntentTxn
  }
}
