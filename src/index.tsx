import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "react-calendar/dist/Calendar.css";
import "./app/layout/style.css";
import App from "./app/layout/App";
import reportWebVitals from "./reportWebVitals";
import { store, StoreContext } from "./app/stores/store";
import { Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory(); // to use history outside component like agent.tsx

ReactDOM.render(
  //BrowserRouter auto provide history object
  <StoreContext.Provider value={store}>
    <Router history={history}>
      <App />
    </Router>
  </StoreContext.Provider>,
  document.getElementById("root")
);

reportWebVitals();
