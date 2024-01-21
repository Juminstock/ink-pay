import { BoomieRampABI } from "@/lib/contracts/BoomieRampABI";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

const boomieRampContract =
  (import.meta.env.VITE_BOOMIE_RAMP_TOKEN_SEPOLIA as `0x${string}`) ?? "";

export const useOnRamp = (intentId: number) => {
  const {
    config,
    error: prepareOnRampError,
    isError: isPrepareOnRampError,
  } = usePrepareContractWrite({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: "onRamp",
    args: [BigInt(intentId)],
    onSettled(data, error) {
      console.log("Settled Prepare onRamp:", { data, error });
    },
  });

  const {
    data: onRampData,
    error: onRampError,
    isError: isOnRampError,
    status: onRampStatus,
    write: onRampWrite,
  } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log("Settled onRamp:", { data, error });
    },
  });

  const {
    data: onRampTxn,
    isLoading: isLoadingOnRampTxn,
    isSuccess: isOnRampTxnSuccess,
  } = useWaitForTransaction({ hash: onRampData?.hash });

  return {
    isLoadingOnRampTxn,
    isPrepareOnRampError,
    isOnRampError,
    isOnRampTxnSuccess,
    prepareOnRampError,
    onRampWrite,
    onRampError,
    onRampStatus,
    onRampTxn,
  };
};
