import { BoomieRampABI } from '@/lib/contracts/BoomieRampABI';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

const boomieRampContract =
  (import.meta.env.VITE_BOOMIE_RAMP_CONTRACT_SEPOLIA as `0x${string}`) ?? '';

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
