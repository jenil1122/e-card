import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Router } from "wouter"; // ✅ Add this

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Router base="/e-card"> {/* ✅ GitHub Pages needs this base path */}
      <App />
    </Router>
  </QueryClientProvider>
);
