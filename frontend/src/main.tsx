import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { HeroUIProvider } from "@heroui/react";
import { ThemeConextProvider } from "./contexts/theme/provider.tsx";
import { AuthGuard } from "./components";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <HeroUIProvider>
        <ThemeConextProvider>
          <AuthGuard>
            <App />
          </AuthGuard>
        </ThemeConextProvider>
      </HeroUIProvider>
    </Provider>
  </StrictMode>
);
