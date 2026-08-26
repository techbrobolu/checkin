import { ChakraProvider, createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
	theme: {
		tokens: {
			colors: {
				red: { value: "#E53E3E" },
				orange: { value: "#DD6B20" },
				green: { value: "#38A169" },
				gray: { value: "#718096" },
			},
		},
		semanticTokens: {
			colors: {
                absent: { value: "{colors.red}" },
                late: { value: "{colors.orange}" },
                onTime: { value: "{colors.green}" },
                excused: { value: "{colors.gray}" },
			},
		},
	},
});

const system = createSystem(defaultConfig, config)

export default system