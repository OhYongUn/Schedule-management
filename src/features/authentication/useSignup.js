import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success(
          "회원가입이 완료되었습니다."
      );
    },
    onError: (error) => {
      toast.error(`회원가입 중 오류가 발생했습니다, 잠시후 다시 시도해주세요: ${error.message}`);
    },
  });

  return { signup, isLoading };
}
