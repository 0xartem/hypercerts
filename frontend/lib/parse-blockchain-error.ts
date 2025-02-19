import { errorMessages } from "../content/readable-errors";
import { useHypercertClient } from "../hooks/hypercerts-client";

export const useParseBlockchainError = () => {
  const {
    client: { contract },
  } = useHypercertClient();
  return (e: any, fallbackMessage: string) => {
    const unparsedErrorData = e?.error?.data?.originalError?.data;

    if (unparsedErrorData) {
      const errorData = contract?.interface?.parseError(unparsedErrorData);

      if (errorData) {
        console.log("Blockchain error", errorData);
        const errorName = errorData.errorFragment.name;
        return errorMessages[errorName] || errorName;
      }
    }

    console.log("Trouble parsing error", { ...e });

    return (
      e?.reason?.replace("execution reverted: ", "") ||
      e?.error?.data?.data?.message ||
      e?.error?.data?.message ||
      e?.message ||
      fallbackMessage
    );
  };
};
