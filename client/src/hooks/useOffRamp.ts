import { BoomieRampABI } from '@/lib/contracts/BoomieRampABI';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

const boomieRampContract =
  (import.meta.env.VITE_BOOMIE_RAMP_CONTRACT_SEPOLIA as `0x${string}`) ?? '';

const decimals = 10e18;

export const useOffRamp = (depositAmount: number, receiveAmount: number) => {
  const {
    config,
    error: prepareOffRampError,
    isError: isPrepareOffRampError,
  } = usePrepareContractWrite({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: 'offRamp',
    args: [BigInt(depositAmount * decimals), BigInt(receiveAmount * decimals)],
    onSettled(data, error) {
      console.log('Settled Prepare offRamp:', { data, error });
    },
  });

  const {
    data: offRampData,
    error: offRampError,
    isError: isOffRampError,
    status: offRampStatus,
    write: offRampWrite,
  } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log('Settled offRamp:', { data, error });
    },
  });

  const {
    data: offRampTxn,
    isLoading: isLoadingOffRampTxn,
    isSuccess: isOffRampTxnSuccess,
  } = useWaitForTransaction({ hash: offRampData?.hash });

  return {
    isLoadingOffRampTxn,
    isPrepareOffRampError,
    isOffRampError,
    isOffRampTxnSuccess,
    prepareOffRampError,
    offRampWrite,
    offRampError,
    offRampStatus,
    offRampTxn,
  };
};
