import { userLogin } from "@/APIs";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: userLogin,
  });
};
