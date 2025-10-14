import { teal } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export const theme = createTheme({
  palette: {
    primary: {
      main: teal[400],
      contrastText: "#fff",
    },
  },
});
