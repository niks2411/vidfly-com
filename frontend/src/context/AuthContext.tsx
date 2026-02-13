import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "");

interface AuthUser {
    email: string;
    name: string;
    id: string;
}

interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    refreshUser: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    refreshUser: async () => { },
    logout: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchMe = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
                credentials: "include", // sends cookies
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);

                // Sync to localStorage for backward compatibility with getVerifiedEmail()
                if (data.user?.email) {
                    localStorage.setItem("logged_user_email", data.user.email);
                    sessionStorage.setItem("vidfly_verified_email", data.user.email);
                }
            } else {
                setUser(null);
            }
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await fetch(`${API_BASE_URL}/api/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
        } catch {
            // Ignore network errors on logout
        }
        setUser(null);
        localStorage.removeItem("logged_user_email");
        sessionStorage.removeItem("vidfly_verified_email");
    };

    useEffect(() => {
        fetchMe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, refreshUser: fetchMe, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
