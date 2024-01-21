import { BoomieRampABI } from '@/lib/contracts/BoomieRampABI';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

const boomieRampContract =
  (import.meta.env.VITE_BOOMIE_RAMP_TOKEN_SEPOLIA as `0x${string}`) ?? '';

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
