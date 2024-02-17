import styled from "styled-components";
import LoginForm from "@/features/authentication/LoginForm.jsx";
import Heading from "@/ui/Heading.jsx";
import LogoImage from "../assets/logo.png"
import Logo from "@/ui/Logo.jsx";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
`;

function Login() {
  return (
    <LoginLayout>
        <Logo src={LogoImage} size="20rem"/>
        <LoginForm />
    </LoginLayout>
  );
}

export default Login;
