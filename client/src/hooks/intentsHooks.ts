import { BoomieRampABI } from '@/lib/contracts/BoomieRampABI';
import { parseEther } from 'viem';
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

const boomieRampContract =
  '0xd73ee34ebaeC74e1f86546D12FB597F962F44680' as `0x${string}`;

export const useSignalIntent = (
  depositId: number,
  amount: number,
  to: `0x${string}`
) => {
  const {
    config,
    error: prepareSignalIntentError,
    isError: isPrepareSignalIntentError,
  } = usePrepareContractWrite({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: 'signalIntent',
    args: [depositId, parseEther(amount.toString()), to],
    onSettled(data, error) {
      console.log('Settled Prepare signalIntent:', { data, error });
    },
  });

  const {
    data: signalIntentData,
    error: signalIntentError,
    isError: isSignalIntentError,
    status: signalIntentStatus,
    write: signalIntentWrite,
  } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log('Settled signalIntent:', { data, error });
    },
  });

  const {
    data: signalIntentTxn,
    isLoading: isLoadingSignalIntentTxn,
    isSuccess: isSignalIntentTxnSuccess,
  } = useWaitForTransaction({ hash: signalIntentData?.hash });

  return {
    isLoadingSignalIntentTxn,
    isPrepareSignalIntentError,
    isSignalIntentError,
    isSignalIntentTxnSuccess,
    prepareSignalIntentError,
    signalIntentWrite,
    signalIntentError,
    signalIntentStatus,
    signalIntentTxn,
  };
};

export const useCancelIntent = (depositId: `0x${string}`) => {
  const {
    config,
    error: prepareCancelIntentError,
    isError: isPrepareCancelIntentError,
  } = usePrepareContractWrite({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: 'cancelIntent',
    args: [depositId],
    onSettled(data, error) {
      console.log('Settled Prepare cancelIntent:', { data, error });
    },
  });

  const {
    data: cancelIntentData,
    error: cancelIntentError,
    isError: isCancelIntentError,
    status: cancelIntentStatus,
    write: cancelIntentWrite,
  } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log('Settled cancelIntent:', { data, error });
    },
  });

  const {
    data: cancelIntentTxn,
    isLoading: isLoadingCancelIntentTxn,
    isSuccess: isCancelIntentTxnSuccess,
  } = useWaitForTransaction({ hash: cancelIntentData?.hash });

  return {
    isLoadingCancelIntentTxn,
    isPrepareCancelIntentError,
    isCancelIntentError,
    isCancelIntentTxnSuccess,
    prepareCancelIntentError,
    cancelIntentWrite,
    cancelIntentError,
    cancelIntentStatus,
    cancelIntentTxn,
  };
};

export const useGetIntentsWithOnRamperId = (intentIds: `0x${string}`[]) => {
  const {
    data: getIntentsWithOnRamperIdData,
    error: getIntentsWithOnRamperIdError,
    isError: isErrorGetIntentsWithOnRamperId,
    isError: isLoadingGetIntentsWithOnRamperId,
  } = useContractRead({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: 'getIntentsWithOnRamperId',
    args: [intentIds],
  });

  return {
    getIntentsWithOnRamperIdData,
    getIntentsWithOnRamperIdError,
    isErrorGetIntentsWithOnRamperId,
    isLoadingGetIntentsWithOnRamperId,
  };
};

export const useGetVenmoIdCurrentIntentHash = (
  accountAddress: `0x${string}`
) => {
  const {
    data: getVenmoIdCurrentIntentHashData,
    error: getVenmoIdCurrentIntentHashError,
    isError: isErrorGetVenmoIdCurrentIntentHash,
    isLoading: isLoadingGetVenmoIdCurrentIntentHash,
  } = useContractRead({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: 'getVenmoIdCurrentIntentHash',
    args: [accountAddress],
  });

  return {
    getVenmoIdCurrentIntentHashData,
    getVenmoIdCurrentIntentHashError,
    isErrorGetVenmoIdCurrentIntentHash,
    isLoadingGetVenmoIdCurrentIntentHash,
  };
};
