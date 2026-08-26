import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Heading,
	VStack,
	Text,
	useToast,
} from "@chakra-ui/react";
import { supabase } from "../supabaseClient";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const navigate = useNavigate();
	const toast = useToast();

	async function handleLogin(e) {
		e.preventDefault();
		setSubmitting(true);

		const { data, error } = await supabase.auth.signInWithPassword({ email, password });

		if (error) {
			toast({ title: "Login failed", description: error.message, status: "error", duration: 4000 });
			setSubmitting(false);
			return;
		}

		// Fetch role directly here rather than waiting on useAuth's listener —
		// avoids a redirect race where we navigate before role is known
		const { data: profile, error: profileError } = await supabase
			.from("profiles")
			.select("role")
			.eq("id", data.user.id)
			.single();

		setSubmitting(false);

		if (profileError || !profile) {
			toast({ title: "Could not load profile", status: "error", duration: 4000 });
			return;
		}

		navigate(profile.role === "admin" ? "/admin" : "/attendee", { replace: true });
	}

	return (
		<Box maxW="sm" mx="auto" mt={20} p={6}>
			<VStack spacing={6} as="form" onSubmit={handleLogin}>
				<Heading size="lg">CheckIn Pro</Heading>
				<FormControl isRequired>
					<FormLabel>Email</FormLabel>
					<Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Password</FormLabel>
					<Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				</FormControl>
				<Button type="submit" colorScheme="blue" width="full" isLoading={submitting}>
					Log In
				</Button>
			</VStack>
		</Box>
	);
}

export default Login;
