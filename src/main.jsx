import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "@radix-ui/themes/styles.css";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const client = new QueryClient()

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<QueryClientProvider client={client}>
			<Router></Router>
		</QueryClientProvider>
	</StrictMode>,
);
