import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store";
import InjectTailwind from "./InjectTailwind";

// HOC
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <InjectTailwind>
        <App />
      </InjectTailwind>
    </Provider>
  </BrowserRouter>
);
