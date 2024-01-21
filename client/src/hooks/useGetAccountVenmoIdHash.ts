import { BoomieRampABI } from '@/lib/contracts/BoomieRampABI';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

const boomieRampContract =
  (import.meta.env.VITE_BOOMIE_RAMP_TOKEN_SEPOLIA as `0x${string}`) ?? '';

export const useGetAccountVenmoIdHash = (accountAddress: `0x${string}`) => {
  const {
    config,
    error: prepareGetAccountVenmoIdHashError,
    isError: isPrepareGetAccountVenmoIdHashError,
  } = usePrepareContractWrite({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: 'getAccountVenmoIdHash',
    args: [accountAddress],
    onSettled(data, error) {
      console.log('Settled Prepare getAccountVenmoIdHash:', { data, error });
    },
  });

  const {
    data: getAccountVenmoIdHashData,
    error: getAccountVenmoIdHashError,
    isError: isGetAccountVenmoIdHashError,
    status: getAccountVenmoIdHashStatus,
    write: getAccountVenmoIdHashWrite,
  } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log('Settled getAccountVenmoIdHash:', { data, error });
    },
  });

  const {
    data: getAccountVenmoIdHashTxn,
    isLoading: isLoadingGetAccountVenmoIdHashTxn,
    isSuccess: isGetAccountVenmoIdHashTxnSuccess,
  } = useWaitForTransaction({ hash: getAccountVenmoIdHashData?.hash });

  return {
    isLoadingGetAccountVenmoIdHashTxn,
    isPrepareGetAccountVenmoIdHashError,
    isGetAccountVenmoIdHashError,
    isGetAccountVenmoIdHashTxnSuccess,
    prepareGetAccountVenmoIdHashError,
    getAccountVenmoIdHashWrite,
    getAccountVenmoIdHashError,
    getAccountVenmoIdHashStatus,
    getAccountVenmoIdHashTxn,
  };
};
