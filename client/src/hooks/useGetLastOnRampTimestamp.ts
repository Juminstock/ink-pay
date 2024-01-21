import { BoomieRampABI } from '@/lib/contracts/BoomieRampABI';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

const boomieRampContract =
  (import.meta.env.VITE_BOOMIE_RAMP_CONTRACT_SEPOLIA as `0x${string}`) ?? '';

export const useGetLastOnRampTimestamp = (accountAddress: `0x${string}`) => {
  const {
    config,
    error: prepareGetLastOnRampTimestampError,
    isError: isPrepareGetLastOnRampTimestampError,
  } = usePrepareContractWrite({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: 'getLastOnRampTimestamp',
    args: [accountAddress],
    onSettled(data, error) {
      console.log('Settled Prepare getLastOnRampTimestamp:', { data, error });
    },
  });

  const {
    data: getLastOnRampTimestampData,
    error: getLastOnRampTimestampError,
    isError: isGetLastOnRampTimestampError,
    status: getLastOnRampTimestampStatus,
    write: getLastOnRampTimestampWrite,
  } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log('Settled getLastOnRampTimestamp:', { data, error });
    },
  });

  const {
    data: getLastOnRampTimestampTxn,
    isLoading: isLoadingGetLastOnRampTimestampTxn,
    isSuccess: isGetLastOnRampTimestampTxnSuccess,
  } = useWaitForTransaction({ hash: getLastOnRampTimestampData?.hash });

  return {
    isLoadingGetLastOnRampTimestampTxn,
    isPrepareGetLastOnRampTimestampError,
    isGetLastOnRampTimestampError,
    isGetLastOnRampTimestampTxnSuccess,
    prepareGetLastOnRampTimestampError,
    getLastOnRampTimestampWrite,
    getLastOnRampTimestampError,
    getLastOnRampTimestampStatus,
    getLastOnRampTimestampTxn,
  };
};
