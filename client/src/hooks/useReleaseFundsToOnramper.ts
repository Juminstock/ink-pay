import { BoomieRampABI } from '@/lib/contracts/BoomieRampABI';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

const boomieRampContract =
  (import.meta.env.VITE_BOOMIE_RAMP_CONTRACT_SEPOLIA as `0x${string}`) ?? '';

export const useReleaseFundsToOnramper = (depositId: `0x${string}`) => {
  const {
    config,
    error: prepareReleaseFundsToOnramperError,
    isError: isPrepareReleaseFundsToOnramperError,
  } = usePrepareContractWrite({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: 'releaseFundsToOnramper',
    args: [depositId],
    onSettled(data, error) {
      console.log('Settled Prepare releaseFundsToOnramper:', { data, error });
    },
  });

  const {
    data: releaseFundsToOnramperData,
    error: releaseFundsToOnramperError,
    isError: isReleaseFundsToOnramperError,
    status: releaseFundsToOnramperStatus,
    write: releaseFundsToOnramperWrite,
  } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log('Settled releaseFundsToOnramper:', { data, error });
    },
  });

  const {
    data: releaseFundsToOnramperTxn,
    isLoading: isLoadingReleaseFundsToOnramperTxn,
    isSuccess: isReleaseFundsToOnramperTxnSuccess,
  } = useWaitForTransaction({ hash: releaseFundsToOnramperData?.hash });

  return {
    isLoadingReleaseFundsToOnramperTxn,
    isPrepareReleaseFundsToOnramperError,
    isReleaseFundsToOnramperError,
    isReleaseFundsToOnramperTxnSuccess,
    prepareReleaseFundsToOnramperError,
    releaseFundsToOnramperWrite,
    releaseFundsToOnramperError,
    releaseFundsToOnramperStatus,
    releaseFundsToOnramperTxn,
  };
};
