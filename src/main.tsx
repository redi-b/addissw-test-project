import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";

import App from "@/App";

import "@/styles/index.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { store } from "@/store";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);
