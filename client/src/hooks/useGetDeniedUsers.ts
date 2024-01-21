import { BoomieRampABI } from '@/lib/contracts/BoomieRampABI';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

const boomieRampContract =
  (import.meta.env.VITE_BOOMIE_RAMP_CONTRACT_SEPOLIA as `0x${string}`) ?? '';

export const useGetDeniedUsers = (accountAddress: `0x${string}`) => {
  const {
    config,
    error: prepareGetDeniedUsersError,
    isError: isPrepareGetDeniedUsersError,
  } = usePrepareContractWrite({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: 'getDeniedUsers',
    args: [accountAddress],
    onSettled(data, error) {
      console.log('Settled Prepare getDeniedUsers:', { data, error });
    },
  });

  const {
    data: getDeniedUsersData,
    error: getDeniedUsersError,
    isError: isGetDeniedUsersError,
    status: getDeniedUsersStatus,
    write: getDeniedUsersWrite,
  } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log('Settled getDeniedUsers:', { data, error });
    },
  });

  const {
    data: getDeniedUsersTxn,
    isLoading: isLoadingGetDeniedUsersTxn,
    isSuccess: isGetDeniedUsersTxnSuccess,
  } = useWaitForTransaction({ hash: getDeniedUsersData?.hash });

  return {
    isLoadingGetDeniedUsersTxn,
    isPrepareGetDeniedUsersError,
    isGetDeniedUsersError,
    isGetDeniedUsersTxnSuccess,
    prepareGetDeniedUsersError,
    getDeniedUsersWrite,
    getDeniedUsersError,
    getDeniedUsersStatus,
    getDeniedUsersTxn,
  };
};
