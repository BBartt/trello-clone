import { createGlobalStyle } from "styled-components";
/* Background pattern from Toptal Subtle Patterns */
import background from "assets/images/ravenna_@2X.png";

const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css?family=Montserrat:300,600");
  @import url("https://fonts.googleapis.com/css?family=Merienda+One&display=swap");

  *, *::before, *::after{
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html{
    font-size: 62.5%;
    margin: 0;
  }

  body{
    font-family: "Montserrat", sans-serif;
    background: url(${background});
    font-size: 1.6rem;
    margin: 0;
    height: 100vh;
  }

  #root{
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

export default GlobalStyle;
