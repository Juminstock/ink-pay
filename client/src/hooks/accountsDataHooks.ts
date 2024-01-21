import { BoomieRampABI } from '@/lib/contracts/BoomieRampABI';
import { useContractRead } from 'wagmi';

const boomieRampContract =
  (import.meta.env.VITE_BOOMIE_RAMP_CONTRACT_SEPOLIA as `0x${string}`) ?? '';

export const useGetAccountDeposits = (accountAddress: `0x${string}`) => {
  const {
    data: getAccountDepositsData,
    error: getAccountDepositsError,
    isError: isGetAccountDepositsError,
    isLoading: isLoadingGetAccountDepositsError,
  } = useContractRead({
    abi: BoomieRampABI,
    address: boomieRampContract,
    functionName: 'getAccountDeposits',
    args: [accountAddress],
  });

  return {
    getAccountDepositsData,
    getAccountDepositsError,
    isGetAccountDepositsError,
    isLoadingGetAccountDepositsError,
  };
};

export const useGetAccountInfo = (accountAddress: `0x${string}`) => {
  const {
    data: getAccountInfoData,
    error: getAccountInfoError,
    isError: isErrorGetAccountInfo,
    isLoading: isLoadingGetAccountInfo,
  } = useContractRead({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: 'getAccountInfo',
    args: [accountAddress],
  });
  return {
    getAccountInfoData,
    getAccountInfoError,
    isErrorGetAccountInfo,
    isLoadingGetAccountInfo,
  };
};

export const useGetAccountVenmoIdHash = (accountAddress: `0x${string}`) => {
  const {
    data: getAccountVenmoIdHashData,
    error: getAccountVenmoIdHashError,
    isError: isErrorGetAccountVenmoIdHash,
    isLoading: isLoadingGetAccountVenmoIdHash,
  } = useContractRead({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: 'getAccountVenmoIdHash',
    args: [accountAddress],
  });

  return {
    getAccountVenmoIdHashData,
    getAccountVenmoIdHashError,
    isErrorGetAccountVenmoIdHash,
    isLoadingGetAccountVenmoIdHash,
  };
};
