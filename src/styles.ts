import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  fontColor: "#2c2c2c",
  bgColor: "lightgray",
  accent: "#0095f6",
  borderColor: "rgb(219, 219, 219)",
};

export const darkTheme = {
  fontColor: "lightgray",
  bgColor: "#2c2c2c",
  borderColor: "#0095f6",
  accent: "rgb(219, 219, 219)",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    body {
        background-color: ${(props) => props.theme.bgColor};
        font-size:14px;
        font-family:'Open Sans', sans-serif;
        color:rgb(38,38,38);
        color:rgb(38, 38, 38);
    }
    a {
      text-decoration:none;
    }
`;