import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";

import App from "@/App";

import "@/styles/index.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { store } from "@/store";
import { AuthProvider } from "./contexts/AuthContext";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </ThemeProvider>
);
