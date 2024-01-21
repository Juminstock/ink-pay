import { BoomieRampABI } from '@/lib/contracts/BoomieRampABI';
import { useContractRead } from 'wagmi';

const boomieRampContract =
  (import.meta.env.VITE_BOOMIE_RAMP_CONTRACT_SEPOLIA as `0x${string}`) ?? '';

export const useGetDepositsWithMinimumBalance = () => {
  console.log(boomieRampContract);
  const {
    data: getDepositsWithMinimumBalanceData,
    error: getDepositsWithMinimumBalanceError,
    isError: isErrorGetDepositsWithMinimumBalance,
    isLoading: isLoadingGetDepositsWithMinimumBalance,
  } = useContractRead({
    address: '0xd73ee34ebaeC74e1f86546D12FB597F962F44680',
    abi: BoomieRampABI,
    functionName: 'getDepositsWithMinimumBalance',
    args: [],
  });

  return {
    getDepositsWithMinimumBalanceData,
    getDepositsWithMinimumBalanceError,
    isErrorGetDepositsWithMinimumBalance,
    isLoadingGetDepositsWithMinimumBalance,
  };
};

export const useGetDeposit = (depositId: `0x${string}`) => {
  const {
    data: getDepositData,
    error: getDepositError,
    isError: isErrorGetDeposit,
    isLoading: isLoadingGetDeposit,
  } = useContractRead({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: 'getDeposit',
    args: [depositId],
  });

  return {
    getDepositData,
    getDepositError,
    isErrorGetDeposit,
    isLoadingGetDeposit,
  };
};

export const useGetDepositFromIds = (depositIds: `0x${string}`[]) => {
  const {
    data: getDepositFromIdsData,
    error: getDepositFromIdsError,
    isError: isErrorGetDepositFromIds,
    isLoading: isLoadingGetDepositFromIds,
  } = useContractRead({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: 'getDepositFromIds',
    args: [depositIds],
  });

  return {
    getDepositFromIdsData,
    getDepositFromIdsError,
    isErrorGetDepositFromIds,
    isLoadingGetDepositFromIds,
  };
};
