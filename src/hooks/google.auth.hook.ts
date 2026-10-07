import { userGoogleLogin } from "@/APIs";
import { useMutation } from "@tanstack/react-query";

export const useGoogleLogin = () => {
  return useMutation({
    mutationFn: userGoogleLogin,
  });
};
