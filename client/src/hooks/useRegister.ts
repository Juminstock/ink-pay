import { BoomieRampABI } from '@/lib/contracts/BoomieRampABI';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

const boomieRampContract =
  (import.meta.env.VITE_BOOMIE_RAMP_CONTRACT_SEPOLIA as `0x${string}`) ?? '';

export const useRegister = () => {
  const {
    config,
    error: prepareRegisterError,
    isError: isPrepareRegisterError,
  } = usePrepareContractWrite({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: 'register',
    onSettled(data, error) {
      console.log('Settled Prepare register:', { data, error });
    },
  });

  const {
    data: registerData,
    error: registerError,
    isError: isRegisterError,
    status: registerStatus,
    write: registerWrite,
  } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log('Settled register:', { data, error });
    },
  });

  const {
    data: registerTxn,
    isLoading: isLoadingRegisterTxn,
    isSuccess: isRegisterTxnSuccess,
  } = useWaitForTransaction({ hash: registerData?.hash });

  return {
    isLoadingRegisterTxn,
    isPrepareRegisterError,
    isRegisterError,
    isRegisterTxnSuccess,
    prepareRegisterError,
    registerWrite,
    registerError,
    registerStatus,
    registerTxn,
  };
};
