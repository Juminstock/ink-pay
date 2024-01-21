import { BoomieRampABI } from '@/lib/contracts/BoomieRampABI';
import { useContractRead } from 'wagmi';

const boomieRampContract =
  (import.meta.env.VITE_BOOMIE_RAMP_CONTRACT_SEPOLIA as `0x${string}`) ?? '';

export const useGetLastOnRampTimestamp = (accountAddress: `0x${string}`) => {
  const {
    data: getLastOnRampTimestampData,
    error: getLastOnRampTimestampError,
    isError: isErrorGetLastOnRampTimestamp,
    isLoading: isLoadingGetLastOnRampTimestamp,
  } = useContractRead({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: 'getLastOnRampTimestamp',
    args: [accountAddress],
  });

  return {
    getLastOnRampTimestampData,
    getLastOnRampTimestampError,
    isErrorGetLastOnRampTimestamp,
    isLoadingGetLastOnRampTimestamp,
  };
};
