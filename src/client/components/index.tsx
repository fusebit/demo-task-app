import React from 'react';
import AppRouter from "./Router";
import {createTheme, ThemeProvider} from "@material-ui/core";

const theme = createTheme({
    palette: {
        primary: {
            main: '#1F2937'
        }
    }
});
const Index =  () => {
    return (
        <ThemeProvider theme={theme}>
            <AppRouter/>
        </ThemeProvider>
    )
}

export default Index;