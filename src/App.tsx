import "react-app-polyfill/ie11";
import SiteStyles from "./components/SiteStyles";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { muiTheme } from "./common";
import { createStore } from "./store";
import TransferForm from "./container/TransferForm";

const { store } = createStore({
  isDev: process.env.NODE_ENV === "development",
});

function App() {
  return (
    <>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ReduxProvider store={store}>
        <StylesProvider injectFirst>
        <ThemeProvider theme={muiTheme}>
          <TransferForm />
        </ThemeProvider>
        </StylesProvider>
      </ReduxProvider>
      <SiteStyles />
    </MuiPickersUtilsProvider>
    </>
  );
}

export default App;
