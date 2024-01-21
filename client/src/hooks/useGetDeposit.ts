import { BoomieRampABI } from '@/lib/contracts/BoomieRampABI';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

const boomieRampContract =
  (import.meta.env.VITE_BOOMIE_RAMP_CONTRACT_SEPOLIA as `0x${string}`) ?? '';

export const useGetDeposit = (depositId: `0x${string}`) => {
  const {
    config,
    error: prepareGetDepositError,
    isError: isPrepareGetDepositError,
  } = usePrepareContractWrite({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: 'getDeposit',
    args: [depositId],
    onSettled(data, error) {
      console.log('Settled Prepare getDeposit:', { data, error });
    },
  });

  const {
    data: getDepositData,
    error: getDepositError,
    isError: isGetDepositError,
    status: getDepositStatus,
    write: getDepositWrite,
  } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log('Settled getDeposit:', { data, error });
    },
  });

  const {
    data: getDepositTxn,
    isLoading: isLoadingGetDepositTxn,
    isSuccess: isGetDepositTxnSuccess,
  } = useWaitForTransaction({ hash: getDepositData?.hash });

  return {
    isLoadingGetDepositTxn,
    isPrepareGetDepositError,
    isGetDepositError,
    isGetDepositTxnSuccess,
    prepareGetDepositError,
    getDepositWrite,
    getDepositError,
    getDepositStatus,
    getDepositTxn,
  };
};
