import { BoomieRampABI } from '@/lib/contracts/BoomieRampABI';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

const boomieRampContract =
  (import.meta.env.VITE_BOOMIE_RAMP_TOKEN_SEPOLIA as `0x${string}`) ?? '';

export const useGetAccountInfo = (accountAddress: `0x${string}`) => {
  const {
    config,
    error: prepareGetAccountInfoError,
    isError: isPrepareGetAccountInfoError,
  } = usePrepareContractWrite({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: 'getAccountInfo',
    args: [accountAddress],
    onSettled(data, error) {
      console.log('Settled Prepare getAccountInfo:', { data, error });
    },
  });

  const {
    data: getAccountInfoData,
    error: getAccountInfoError,
    isError: isGetAccountInfoError,
    status: getAccountInfoStatus,
    write: getAccountInfoWrite,
  } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log('Settled getAccountInfo:', { data, error });
    },
  });

  const {
    data: getAccountInfoTxn,
    isLoading: isLoadingGetAccountInfoTxn,
    isSuccess: isGetAccountInfoTxnSuccess,
  } = useWaitForTransaction({ hash: getAccountInfoData?.hash });

  return {
    isLoadingGetAccountInfoTxn,
    isPrepareGetAccountInfoError,
    isGetAccountInfoError,
    isGetAccountInfoTxnSuccess,
    prepareGetAccountInfoError,
    getAccountInfoWrite,
    getAccountInfoError,
    getAccountInfoStatus,
    getAccountInfoTxn,
  };
};
