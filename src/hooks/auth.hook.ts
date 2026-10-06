import { userGetMe, userLogin, userLogout } from "@/APIs";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: userLogin,
  });
};
export const useLogout = () => {
  return useMutation({
    mutationFn: userLogout,
  });
};
export const useGetMe = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: userGetMe,
    retry: false,
  });
};
