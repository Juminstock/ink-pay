import { BoomieRampABI } from '@/lib/contracts/BoomieRampABI';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

const boomieRampContract =
  (import.meta.env.VITE_BOOMIE_RAMP_CONTRACT_SEPOLIA as `0x${string}`) ?? '';

export const useWithdrawDeposit = (depositIds: `0x${string}`[]) => {
  const {
    config,
    error: prepareWithdrawDepositError,
    isError: isPrepareWithdrawDepositError,
  } = usePrepareContractWrite({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: 'withdrawDeposit',
    args: [depositIds],
    onSettled(data, error) {
      console.log('Settled Prepare withdrawDeposit:', { data, error });
    },
  });

  const {
    data: withdrawDepositData,
    error: withdrawDepositError,
    isError: isWithdrawDepositError,
    status: withdrawDepositStatus,
    write: withdrawDepositWrite,
  } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log('Settled withdrawDeposit:', { data, error });
    },
  });

  const {
    data: withdrawDepositTxn,
    isLoading: isLoadingWithdrawDepositTxn,
    isSuccess: isWithdrawDepositTxnSuccess,
  } = useWaitForTransaction({ hash: withdrawDepositData?.hash });

  return {
    isLoadingWithdrawDepositTxn,
    isPrepareWithdrawDepositError,
    isWithdrawDepositError,
    isWithdrawDepositTxnSuccess,
    prepareWithdrawDepositError,
    withdrawDepositWrite,
    withdrawDepositError,
    withdrawDepositStatus,
    withdrawDepositTxn,
  };
};
