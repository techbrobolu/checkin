import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
	colors: {
		status: {
			onTime: "#38A169", // green
			late: "#DD6B20", // orange
			absent: "#E53E3E", // red
			excused: "#718096", // gray
		},
	},
	config: {
		initialColorMode: "light",
		useSystemColorMode: false, // don't let this drift into dark mode work — that's cut, remember
	},
});

export default theme;
