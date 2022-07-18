import { lightGreen } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
const { palette } = createTheme();

export const theme = createTheme({
    palette: {
        type: "light",
        primary: {
            main: "#2F80ED",
            contrastText: "#FFFFFF",
        },
        secondary: {
            main: "#f2f2f2",
            contrastText: "#828282",
        },
        light: {
            main: "#dae4fd",
            contrastText: "#2c81ea",
        },
        red: {
            main: "#FFEBEB",
            contrastText: "#EB5757",
        },
        green: {
            main: "#D3EADD",
            contrastText: "#219653",
        },
        yellow: {
            main: "#FCF4DB",
            contrastText: "#F2C94C",
        },
        orange: {
            main: "rgba(242, 153, 74, 0.2)",
            contrastText: "#F2994A",
        },
        purple: {
            main: "#EBDCF9",
            contrastText: "#9B51E0",
        },
        blue: {
            main: "#D5E6FB",
            contrastText: "#2F80ED",
        },
        text: {
            primary: "#333333",
            secondary: "#000000",
        },
        background: {
            default: "#ffffff",
            paper: "#FFFFFF",
        },
        divider: "#E0E0E0",
    },
    typography: {
        fontWeightLight: 400,
        button: {
            fontSize: "1.2rem",
        },
        h1: {
            fontFamily: "Poppins",
            fontSize: "1.8rem",
            fontWeight: 500,
        },
        h3: {
            fontFamily: "Noto Sans",
            fontSize: "1.6rem",
            letterSpacing: "-0.04em",
        },
        h4: {
            fontFamily: "Poppins",
            fontSize: "1.4rem",
            fontWeight: 500,
        },
        subtitle1: {
            fontFamily: "Noto Sans",
            fontSize: "1rem",
            fontWeight: 500,
        },
        fontFamily: "Poppins",
        body2: {
            fontSize: "0.9rem",
            fontWeight: 500,
            fontFamily: "Noto Sans",
        },
    },
    shape: {
        borderRadius: 8,
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 475,
            sd: 700,
            md: 950,
            lg: 1200,
            xl: 1535,
        },
    },
});
