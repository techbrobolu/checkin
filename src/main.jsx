import { ChakraProvider } from "@chakra-ui/react";
import system from "./theme";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ChakraProvider value={system}>
			<ProtectedRoute>
				<App />
			</ProtectedRoute>
		</ChakraProvider>
	</StrictMode>,
);
