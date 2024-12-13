import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SocketContextProvider } from "./context/socket.context.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <SocketContextProvider>
      <App />
    </SocketContextProvider>
  </QueryClientProvider>
);
