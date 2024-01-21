import { BoomieRampABI } from '@/lib/contracts/BoomieRampABI';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

const boomieRampContract =
  (import.meta.env.VITE_BOOMIE_RAMP_CONTRACT_SEPOLIA as `0x${string}`) ?? '';

export const useGetDepositsWithMinimumBalance = () => {
  const {
    config,
    error: prepareGetDepositsWithMinimumBalanceError,
    isError: isPrepareGetDepositsWithMinimumBalanceError,
  } = usePrepareContractWrite({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: 'getDepositsWithMinimumBalance',
    args: [],
    onSettled(data, error) {
      console.log('Settled Prepare getDepositsWithMinimumBalance:', {
        data,
        error,
      });
    },
  });

  const {
    data: getDepositsWithMinimumBalanceData,
    error: getDepositsWithMinimumBalanceError,
    isError: isGetDepositsWithMinimumBalanceError,
    status: getDepositsWithMinimumBalanceStatus,
    write: getDepositsWithMinimumBalanceWrite,
  } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log('Settled getDepositsWithMinimumBalance:', { data, error });
    },
  });

  const {
    data: getDepositsWithMinimumBalanceTxn,
    isLoading: isLoadingGetDepositsWithMinimumBalanceTxn,
    isSuccess: isGetDepositsWithMinimumBalanceTxnSuccess,
  } = useWaitForTransaction({ hash: getDepositsWithMinimumBalanceData?.hash });

  return {
    isLoadingGetDepositsWithMinimumBalanceTxn,
    isPrepareGetDepositsWithMinimumBalanceError,
    isGetDepositsWithMinimumBalanceError,
    isGetDepositsWithMinimumBalanceTxnSuccess,
    prepareGetDepositsWithMinimumBalanceError,
    getDepositsWithMinimumBalanceWrite,
    getDepositsWithMinimumBalanceError,
    getDepositsWithMinimumBalanceStatus,
    getDepositsWithMinimumBalanceTxn,
  };
};
