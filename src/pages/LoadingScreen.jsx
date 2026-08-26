import { Center, Spinner, Text, VStack } from "@chakra-ui/react";

function LoadingScreen() {
	return (
		<Center h="100vh" bg="white">
			<VStack gap={4}>
				<Spinner size="xl" thickness="4px" color="blue.500" />
				<Text color="gray.500" fontSize="sm">
					Loading CheckIn Pro...
				</Text>
			</VStack>
		</Center>
	);
}

export default LoadingScreen;
