import { BoomieRampABI } from '@/lib/contracts/BoomieRampABI';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

const boomieRampContract =
  (import.meta.env.VITE_BOOMIE_RAMP_CONTRACT_SEPOLIA as `0x${string}`) ?? '';

export const useGetAccountDeposits = (accountAddress: `0x${string}`) => {
  const {
    config,
    error: prepareGetAccountDepositsError,
    isError: isPrepareGetAccountDepositsError,
  } = usePrepareContractWrite({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: 'getAccountDeposits',
    args: [accountAddress],
    onSettled(data, error) {
      console.log('Settled Prepare getAccountDeposits:', { data, error });
    },
  });

  const {
    data: getAccountDepositsData,
    error: getAccountDepositsError,
    isError: isGetAccountDepositsError,
    status: getAccountDepositsStatus,
    write: getAccountDepositsWrite,
  } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log('Settled getAccountDeposits:', { data, error });
    },
  });

  const {
    data: getAccountDepositsTxn,
    isLoading: isLoadingGetAccountDepositsTxn,
    isSuccess: isGetAccountDepositsTxnSuccess,
  } = useWaitForTransaction({ hash: getAccountDepositsData?.hash });

  return {
    isLoadingGetAccountDepositsTxn,
    isPrepareGetAccountDepositsError,
    isGetAccountDepositsError,
    isGetAccountDepositsTxnSuccess,
    prepareGetAccountDepositsError,
    getAccountDepositsWrite,
    getAccountDepositsError,
    getAccountDepositsStatus,
    getAccountDepositsTxn,
  };
};
