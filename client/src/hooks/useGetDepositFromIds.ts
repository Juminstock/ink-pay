import { BoomieRampABI } from '@/lib/contracts/BoomieRampABI';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

const boomieRampContract =
  (import.meta.env.VITE_BOOMIE_RAMP_TOKEN_SEPOLIA as `0x${string}`) ?? '';

export const useGetDepositFromIds = (depositIds: `0x${string}`[]) => {
  const {
    config,
    error: prepareGetDepositFromIdsError,
    isError: isPrepareGetDepositFromIdsError,
  } = usePrepareContractWrite({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: 'getDepositFromIds',
    args: [depositIds],
    onSettled(data, error) {
      console.log('Settled Prepare getDepositFromIds:', { data, error });
    },
  });

  const {
    data: getDepositFromIdsData,
    error: getDepositFromIdsError,
    isError: isGetDepositFromIdsError,
    status: getDepositFromIdsStatus,
    write: getDepositFromIdsWrite,
  } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log('Settled getDepositFromIds:', { data, error });
    },
  });

  const {
    data: getDepositFromIdsTxn,
    isLoading: isLoadingGetDepositFromIdsTxn,
    isSuccess: isGetDepositFromIdsTxnSuccess,
  } = useWaitForTransaction({ hash: getDepositFromIdsData?.hash });

  return {
    isLoadingGetDepositFromIdsTxn,
    isPrepareGetDepositFromIdsError,
    isGetDepositFromIdsError,
    isGetDepositFromIdsTxnSuccess,
    prepareGetDepositFromIdsError,
    getDepositFromIdsWrite,
    getDepositFromIdsError,
    getDepositFromIdsStatus,
    getDepositFromIdsTxn,
  };
};
