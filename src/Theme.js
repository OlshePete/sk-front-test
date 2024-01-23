import { createTheme } from "@material-ui/core";
export const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
    background: {
      default: "#f7fafc",
    },
    text: {
      primary: "#4974ad",
      secondary: "#7b98ba",
      gray: "gray",
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      '"Fira Sans"',
      '"Droid Sans"',
      '"Helvetica Neue"',
      'sans-serif',
    ].join(','),
    caption: {
      fontSize: "12px",
      color: "gray",
      letterSpacing: "0.01071em",
    },
    body2: {
      "& .noMessage": {
        fontSize: "14px",
        width: "100%",
        listStyleType: "none",
        color: "gray",
        textAlign: "center",
        lineHeight: "100px",
      },
      "& .messageTime": {
        position: "absolute",
        right: "4px",
        bottom: "2px",
        fontSize: "12px",
        color: "#7b98ba",
      },
      "& .messageSender": {
        fontSize: "12px",
        fontWeight: "600",
        color: "#4974ad",
      },
      "& .messageText": {
        position:"relative",
        color: "black",
        background: "#e1e8f0",
        width:"100%",
        padding: "0 8px",
        paddingRight: "32px",
        borderRadius: "4px",
        wordBreak: "break-all",
        display: "flex",
        flexDirection: "column",
      },
    },
  },
  overrides: {
    MuiContainer:{
      root:{
        minWidth: '320px',
        maxWidth: '900px',
        maxHeight: '100vh',
        height: '100vh',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }
    },
    MuiButton: {
      text: {
        color: "teal",
      },
    },
    MuiList: {
      root: {
        background:'#f7fafc',
        padding:'14px',
        height:'calc(100dvh - 50px)',
        overflowY:'auto'
      },
    },
    MuiListItem: {
      root: {
        listStyleType: 'none',
        position: 'relative',
        margin: '10px 0',
        padding:'0!important',
      },
    },
    MuiFormControl: {
      root: {
        minWidth: "116px",
        maxWidth: "144.4px",
        padding: "0 8px",
        borderRight: "1px solid gray",
      },
    },
    MuiInputBase: {
      root: {
        border: "2px solid rgba(0,0,0,0)",
        outline: "1px solid rgba(0,0,0,0)",
        padding: 0,
        borderRadius: "4px",
        width: "fit-content",
        "&.usernameValue.Mui-focused": {
          border: "2px solid rgba(0,0,0,1)",
          outline: "1px solid rgba(255,255,255,1)",
        },
        "& > input": {
          fontSize: "13.3333px",
          color: "rgb(0, 0, 0)",
          padding: "1px 2px",
          minWidth: "fit-content",
          maxWidth: "100px",
        },
        "&.messageInput": {
          height: "100%",
          border: "none",
          outline: "none",
          flexGrow: 1,
          background: "none",
          paddingRight: 0,
          "& > input": {
            maxHeight: "100%",
            minWidth: "calc(100% - 20px)",
            flexGrow: 1,
            padding: "10px",
          },
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: "1px 6px",
        borderRadius: 0,
        height: "100%",
        "&.MuiIconButton-root:hover": {
          background: "none",
        },
        "&.MuiIconButton-root:focus-visible": {
          borderRadius: "4px",
          border: "2px solid rgba(0,0,0,1)",
          outline: "1px solid rgba(255,255,255,1)",
        },
      },
    },
    MuiCard: {
      root: {
        borderRadius: 0,
        width: "100%",
        display: "flex",
        background: "#bfcdde",
        minHeight: "50px",
      },
    },
  },
});
