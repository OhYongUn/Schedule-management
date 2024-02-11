import { useForm } from "react-hook-form";
import Button from "./Button.jsx";
import Form from "./Form.jsx";
import FormRow from "./FormRow.jsx";
import Input from "./Input.jsx";
import { useSignup } from "../features/authentication/useSignup.js";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isLoading } = useSignup();

  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ name, email, password }) {
    signup(
      { name, email, password },
      {
        onSettled: () => reset(),
      },
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="이름" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register("fullName", { required: "이름을 입력해주세요" })}
        />
      </FormRow>

      <FormRow label="이메일" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "이메일을 입력해주세요",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="비밀번호 (최소 6자리이상)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "비밀번호는 최소 6자리 이상입니다.",
            },
          })}
        />
      </FormRow>
      <FormRow label="비밀번호 재입력" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={reset} disabled={isLoading}>
          취소
        </Button>
        <Button disabled={isLoading} >회원가입</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
