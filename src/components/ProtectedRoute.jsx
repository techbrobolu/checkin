if (loading) return <LoadingScreen />;
if (!user) return <Navigate to="/login" />;
if (requiredRole && role !== requiredRole) return <Navigate to="/login" />;
return children;
