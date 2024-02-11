import styled from "styled-components";
import LoginForm from "@/features/authentication/LoginForm.jsx";
import Heading from "@/ui/Heading.jsx";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
`;

function Login() {
  return (
    <LoginLayout>
        <Heading as="h4">Login</Heading>
        <LoginForm />
    </LoginLayout>
  );
}

export default Login;
