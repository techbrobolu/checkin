import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export function useAuth() {
	const [user, setUser] = useState(null);
	const [role, setRole] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;

		// 1. Check for an existing session on load
		async function initSession() {
			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (session?.user) {
				await loadUserWithRole(session.user);
			} else {
				if (isMounted) {
					setUser(null);
					setRole(null);
					setLoading(false);
				}
			}
		}

		// 2. Fetch the role from `profiles`, then flip loading off
		async function loadUserWithRole(authUser) {
			const { data: profile, error } = await supabase
				.from("profiles")
				.select("role")
				.eq("id", authUser.id)
				.single();

			if (!isMounted) return;

			if (error) {
				console.error("Failed to fetch profile role:", error.message);
				// Fail safe: treat as attendee rather than crashing the app
				setRole("attendee");
			} else {
				setRole(profile.role);
			}

			setUser(authUser);
			setLoading(false);
		}

		initSession();

		// 3. Listen for login/logout/token refresh events
		const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
			if (session?.user) {
				setLoading(true);
				await loadUserWithRole(session.user);
			} else {
				setUser(null);
				setRole(null);
				setLoading(false);
			}
		});

		return () => {
			isMounted = false;
			listener.subscription.unsubscribe();
		};
	}, []);

	return { user, role, loading };
}
