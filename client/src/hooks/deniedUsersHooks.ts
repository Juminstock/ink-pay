import { BoomieRampABI } from '@/lib/contracts/BoomieRampABI';
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

const boomieRampContract =
  (import.meta.env.VITE_BOOMIE_RAMP_CONTRACT_SEPOLIA as `0x${string}`) ?? '';

export const useGetDeniedUsers = (accountAddress: `0x${string}`) => {
  const {
    data: getDeniedUsersData,
    error: getDeniedUsersError,
    isError: isErrorGetDeniedUsers,
    isLoading: isLoadingGetDeniedUsers,
  } = useContractRead({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: 'getDeniedUsers',
    args: [accountAddress],
  });

  return {
    getDeniedUsersData,
    getDeniedUsersError,
    isErrorGetDeniedUsers,
    isLoadingGetDeniedUsers,
  };
};

export const useIsDeniedUser = (
  accountAddress: `0x${string}`,
  deniedUserAddress: `0x${string}`
) => {
  const {
    data: isDeniedUserData,
    error: isDeniedUserError,
    isError: isErrorIsDeniedUser,
    isLoading: isLoadingIsDeniedUser,
  } = useContractRead({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: 'isDeniedUser',
    args: [accountAddress, deniedUserAddress],
  });

  return {
    isDeniedUserData,
    isDeniedUserError,
    isErrorIsDeniedUser,
    isLoadingIsDeniedUser,
  };
};
export const useAddAccountToDenylist = (deniedUserAddress: `0x${string}`) => {
  const {
    config,
    error: prepareAddAccountToDenylistError,
    isError: isPrepareAddAccountToDenylistError,
  } = usePrepareContractWrite({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: 'addAccountToDenylist',
    args: [deniedUserAddress],
    onSettled(data, error) {
      console.log('Settled Prepare addAccountToDenylist:', { data, error });
    },
  });

  const {
    data: addAccountToDenylistData,
    error: addAccountToDenylistError,
    isError: isAddAccountToDenylistError,
    status: addAccountToDenylistStatus,
    write: addAccountToDenylistWrite,
  } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log('Settled addAccountToDenylist:', { data, error });
    },
  });

  const {
    data: addAccountToDenylistTxn,
    isLoading: isLoadingAddAccountToDenylistTxn,
    isSuccess: isAddAccountToDenylistTxnSuccess,
  } = useWaitForTransaction({ hash: addAccountToDenylistData?.hash });

  return {
    isLoadingAddAccountToDenylistTxn,
    isPrepareAddAccountToDenylistError,
    isAddAccountToDenylistError,
    isAddAccountToDenylistTxnSuccess,
    prepareAddAccountToDenylistError,
    addAccountToDenylistWrite,
    addAccountToDenylistError,
    addAccountToDenylistStatus,
    addAccountToDenylistTxn,
  };
};
export const useRemoveAccountFromDenylist = (
  deniedUserAddress: `0x${string}`
) => {
  const {
    config,
    error: prepareRemoveAccountFromDenylistError,
    isError: isPrepareRemoveAccountFromDenylistError,
  } = usePrepareContractWrite({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: 'removeAccountFromDenylist',
    args: [deniedUserAddress],
    onSettled(data, error) {
      console.log('Settled Prepare removeAccountFromDenylist:', {
        data,
        error,
      });
    },
  });

  const {
    data: removeAccountFromDenylistData,
    error: removeAccountFromDenylistError,
    isError: isRemoveAccountFromDenylistError,
    status: removeAccountFromDenylistStatus,
    write: removeAccountFromDenylistWrite,
  } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log('Settled removeAccountFromDenylist:', { data, error });
    },
  });

  const {
    data: removeAccountFromDenylistTxn,
    isLoading: isLoadingRemoveAccountFromDenylistTxn,
    isSuccess: isRemoveAccountFromDenylistTxnSuccess,
  } = useWaitForTransaction({ hash: removeAccountFromDenylistData?.hash });

  return {
    isLoadingRemoveAccountFromDenylistTxn,
    isPrepareRemoveAccountFromDenylistError,
    isRemoveAccountFromDenylistError,
    isRemoveAccountFromDenylistTxnSuccess,
    prepareRemoveAccountFromDenylistError,
    removeAccountFromDenylistWrite,
    removeAccountFromDenylistError,
    removeAccountFromDenylistStatus,
    removeAccountFromDenylistTxn,
  };
};
