import { BoomieRampABI } from '@/lib/contracts/BoomieRampABI';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

const boomieRampContract =
  (import.meta.env.VITE_BOOMIE_RAMP_CONTRACT_SEPOLIA as `0x${string}`) ?? '';

export const useGetVenmoIdCurrentIntentHash = (
  accountAddress: `0x${string}`
) => {
  const {
    config,
    error: prepareGetVenmoIdCurrentIntentHashError,
    isError: isPrepareGetVenmoIdCurrentIntentHashError,
  } = usePrepareContractWrite({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: 'getVenmoIdCurrentIntentHash',
    args: [accountAddress],
    onSettled(data, error) {
      console.log('Settled Prepare getVenmoIdCurrentIntentHash:', {
        data,
        error,
      });
    },
  });

  const {
    data: getVenmoIdCurrentIntentHashData,
    error: getVenmoIdCurrentIntentHashError,
    isError: isGetVenmoIdCurrentIntentHashError,
    status: getVenmoIdCurrentIntentHashStatus,
    write: getVenmoIdCurrentIntentHashWrite,
  } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log('Settled getVenmoIdCurrentIntentHash:', { data, error });
    },
  });

  const {
    data: getVenmoIdCurrentIntentHashTxn,
    isLoading: isLoadingGetVenmoIdCurrentIntentHashTxn,
    isSuccess: isGetVenmoIdCurrentIntentHashTxnSuccess,
  } = useWaitForTransaction({ hash: getVenmoIdCurrentIntentHashData?.hash });

  return {
    isLoadingGetVenmoIdCurrentIntentHashTxn,
    isPrepareGetVenmoIdCurrentIntentHashError,
    isGetVenmoIdCurrentIntentHashError,
    isGetVenmoIdCurrentIntentHashTxnSuccess,
    prepareGetVenmoIdCurrentIntentHashError,
    getVenmoIdCurrentIntentHashWrite,
    getVenmoIdCurrentIntentHashError,
    getVenmoIdCurrentIntentHashStatus,
    getVenmoIdCurrentIntentHashTxn,
  };
};
