import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { ThemeConextProvider } from "./contexts/theme/provider.tsx";
import { AuthGuard } from "./components";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <HeroUIProvider>
        <ToastProvider
          placement="top-right"
          toastOffset={60}
          toastProps={{
            radius: "md",
            timeout: 2000,
            shouldShowTimeoutProgress: true,
            classNames: {
              closeButton:
                "opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
            },
          }}
        />
        <ThemeConextProvider>
          <AuthGuard>
            <App />
          </AuthGuard>
        </ThemeConextProvider>
      </HeroUIProvider>
    </Provider>
  </StrictMode>
);
