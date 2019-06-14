import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.lightGreen};
  font-family: "Merienda One", cursive;
  color: #009f85;
  font-size: ${({ theme }) => theme.fontSize.xl};
  text-transform: uppercase;
  text-align: center;
  font-style: oblique;
`;

export default StyledHeader;
