import React from "react";
import { Router, Route } from "react-router";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";

import Layout from "./containers/layout";
import Phones from "./containers/phones";
import Phone from "./containers/phone";
import Basket from "./containers/basket";
import reducers from "./reducers";

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk, middleware))
);

const App: React.SFC<{}> = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route component={Layout}>
          <Route path="/" component={Phones} />
          <Route path="/categories/:id" component={Phones} />
        </Route>
        <Route path="/phones/:id" component={Phone} />
        <Route path="/basket" component={Basket} />
      </Router>
    </Provider>
  );
};

export default App;
