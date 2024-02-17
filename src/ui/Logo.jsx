import styled from "styled-components";

const StyledLogo = styled.div`
    text-align: center;
    background-color: #fff;
`;

const Img = styled.img`
  height: ${(props) => props.size || '9.6rem'};
  width: auto;
`;

function Logo({src,size}) {
  return (
    <StyledLogo>
      <Img src={src} alt="Logo" size={size} />
    </StyledLogo>
  );
}

export default Logo;
