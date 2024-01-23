import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";
import rootSaga from "./sagas";
import Messenger from "./components/Messenger";
import setupSocket from "./websocket-client";

import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { theme } from "Theme";

try {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  const socket = setupSocket(store.dispatch);
  sagaMiddleware.run(rootSaga, { socket });
  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Messenger />
      </ThemeProvider>
    </Provider>,
    document.querySelector("#root")
  );
} catch (error) {
  console.log("Error!", error);
}
