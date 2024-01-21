import { BoomieRampABI } from '@/lib/contracts/BoomieRampABI';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

const boomieRampContract =
  (import.meta.env.VITE_BOOMIE_RAMP_CONTRACT_SEPOLIA as `0x${string}`) ?? '';

export const useGetIntentsWithOnRamperId = (intentIds: `0x${string}`[]) => {
  const {
    config,
    error: prepareGetIntentsWithOnRamperIdError,
    isError: isPrepareGetIntentsWithOnRamperIdError,
  } = usePrepareContractWrite({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: 'getIntentsWithOnRamperId',
    args: [intentIds],
    onSettled(data, error) {
      console.log('Settled Prepare getIntentsWithOnRamperId:', { data, error });
    },
  });

  const {
    data: getIntentsWithOnRamperIdData,
    error: getIntentsWithOnRamperIdError,
    isError: isGetIntentsWithOnRamperIdError,
    status: getIntentsWithOnRamperIdStatus,
    write: getIntentsWithOnRamperIdWrite,
  } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log('Settled getIntentsWithOnRamperId:', { data, error });
    },
  });

  const {
    data: getIntentsWithOnRamperIdTxn,
    isLoading: isLoadingGetIntentsWithOnRamperIdTxn,
    isSuccess: isGetIntentsWithOnRamperIdTxnSuccess,
  } = useWaitForTransaction({ hash: getIntentsWithOnRamperIdData?.hash });

  return {
    isLoadingGetIntentsWithOnRamperIdTxn,
    isPrepareGetIntentsWithOnRamperIdError,
    isGetIntentsWithOnRamperIdError,
    isGetIntentsWithOnRamperIdTxnSuccess,
    prepareGetIntentsWithOnRamperIdError,
    getIntentsWithOnRamperIdWrite,
    getIntentsWithOnRamperIdError,
    getIntentsWithOnRamperIdStatus,
    getIntentsWithOnRamperIdTxn,
  };
};
