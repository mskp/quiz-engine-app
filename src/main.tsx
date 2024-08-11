import "@/assets/globals.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxServiceProvider } from "react-redux";
import { Toaster } from "./components/ui/toaster";
import { routeTree } from "./routeTree.gen";
import store from "./services/redux/store";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <ReduxServiceProvider store={store}>
        <RouterProvider router={router} />
        <Toaster />
      </ReduxServiceProvider>
    </StrictMode>
  );
}
