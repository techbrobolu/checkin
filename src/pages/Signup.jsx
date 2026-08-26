import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Heading,
	VStack,
	Text,
	Link,
	useToast,
} from "@chakra-ui/react";
import { supabase } from "../lib/supabaseClient";

function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fullName, setFullName] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const navigate = useNavigate();
	const toast = useToast();

	async function handleSignup(e) {
		e.preventDefault();
		setSubmitting(true);

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: { full_name: fullName }, // stashed in auth.users metadata, not profiles
			},
		});

		setSubmitting(false);

		if (error) {
			toast({
				title: "Signup failed",
				description: error.message,
				status: "error",
				duration: 4000,
			});
			return;
		}

		// If email confirmation is ON, there's no session yet — data.session is null.
		if (!data.session) {
			toast({
				title: "Check your email",
				description: "Confirm your account to finish signing up.",
				status: "info",
				duration: 6000,
			});
			navigate("/login", { replace: true });
			return;
		}

		// Email confirmation OFF — session exists immediately, trigger has already
		// fired and created the profiles row with role: 'attendee'
		navigate("/attendee", { replace: true });
	}

	return (
		<Box maxW="sm" mx="auto" mt={20} p={6}>
			<VStack spacing={6} as="form" onSubmit={handleSignup}>
				<Heading size="lg">Create Account</Heading>
				<FormControl isRequired>
					<FormLabel>Full Name</FormLabel>
					<Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Email</FormLabel>
					<Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Password</FormLabel>
					<Input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						minLength={6}
					/>
				</FormControl>
				<Button type="submit" colorScheme="blue" width="full" isLoading={submitting}>
					Sign Up
				</Button>
				<Text fontSize="sm">
					Already have an account?{" "}
					<Link as={RouterLink} to="/login" color="blue.500">
						Log in
					</Link>
				</Text>
			</VStack>
		</Box>
	);
}

export default Signup;
