import { BASE_URL } from "@/shared/constants";
import store from "@/store";

export const handleErrorResponse = (
  statusCode: number
): { props: { hasError: boolean; statusCode: number } } => {
  return {
    props: {
      hasError: true,
      statusCode,
    },
  };
};
