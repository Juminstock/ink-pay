import { BoomieRampABI } from "@/lib/contracts/BoomieRampABI";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

const boomieRampContract =
  (import.meta.env.VITE_BOOMIE_RAMP_TOKEN_SEPOLIA as `0x${string}`) ?? "";

export const useCancelIntent = (depositId: `0x${string}`) => {
  const {
    config,
    error: prepareCancelIntentError,
    isError: isPrepareCancelIntentError,
  } = usePrepareContractWrite({
    address: boomieRampContract,
    abi: BoomieRampABI,
    functionName: "cancelIntent",
    args: [depositId],
    onSettled(data, error) {
      console.log("Settled Prepare cancelIntent:", { data, error });
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
      console.log("Settled cancelIntent:", { data, error });
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
