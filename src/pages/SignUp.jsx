import styled from "styled-components";
import SignupForm from "../ui/SignupForm.jsx";

const SignUpLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function SignUp() {
  return (
    <SignUpLayout>
      <SignupForm />
    </SignUpLayout>
  );
}

export default SignUp;
