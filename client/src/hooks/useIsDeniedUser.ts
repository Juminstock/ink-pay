import { BoomieRampABI } from '@/lib/contracts/BoomieRampABI';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

const boomieRampContract =
  (import.meta.env.VITE_BOOMIE_RAMP_TOKEN_SEPOLIA as `0x${string}`) ?? '';

export const useIsDeniedUser = (
  accountAddress: `0x${string}`,
  deniedUserAddress: `0x${string}`
) => {
  const {
    config,
    error: prepareIsDeniedUserError,
    isError: isPrepareIsDeniedUserError,
  } = usePrepareContractWrite({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: 'isDeniedUser',
    args: [accountAddress, deniedUserAddress],
    onSettled(data, error) {
      console.log('Settled Prepare isDeniedUser:', { data, error });
    },
  });

  const {
    data: isDeniedUserData,
    error: isDeniedUserError,
    isError: isIsDeniedUserError,
    status: isDeniedUserStatus,
    write: isDeniedUserWrite,
  } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log('Settled isDeniedUser:', { data, error });
    },
  });

  const {
    data: isDeniedUserTxn,
    isLoading: isLoadingIsDeniedUserTxn,
    isSuccess: isIsDeniedUserTxnSuccess,
  } = useWaitForTransaction({ hash: isDeniedUserData?.hash });

  return {
    isLoadingIsDeniedUserTxn,
    isPrepareIsDeniedUserError,
    isIsDeniedUserError,
    isIsDeniedUserTxnSuccess,
    prepareIsDeniedUserError,
    isDeniedUserWrite,
    isDeniedUserError,
    isDeniedUserStatus,
    isDeniedUserTxn,
  };
};
