"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useMemo, useRef } from "react";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

interface AuthUser {
    email: string;
    name: string;
    id: string;
    avatar?: string;
    googleId?: string;
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
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const fetchingRef = useRef(false);
    const userRef = useRef<AuthUser | null>(null);

    useEffect(() => {
        userRef.current = user;
    }, [user]);

    const hasStoredAuthMarkers = () => {
        if (typeof window === "undefined") return false;
        return Boolean(
            localStorage.getItem("logged_user_email") ||
            sessionStorage.getItem("vidfly_verified_email")
        );
    };

    const persistUserMarkers = (email?: string) => {
        if (!email || typeof window === "undefined") return;
        localStorage.setItem("logged_user_email", email);
        sessionStorage.setItem("vidfly_verified_email", email);
    };

    const clearUserMarkers = () => {
        if (typeof window === "undefined") return;
        localStorage.removeItem("logged_user_email");
        sessionStorage.removeItem("vidfly_verified_email");
    };

    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const requestMe = () =>
        fetch(`${API_BASE_URL}/api/auth/me`, {
            credentials: "include",
        });

    const fetchMe = async () => {
        if (fetchingRef.current) return;
        fetchingRef.current = true;
        console.log("[AuthContext] fetchMe started");
        setLoading(true);
        try {
            const res = await requestMe();
            console.log("[AuthContext] fetchMe status:", res.status);
            if (res.ok) {
                const data = await res.json();
                console.log("[AuthContext] User found:", data.user?.email);
                setUser(data.user);
                persistUserMarkers(data.user?.email);
            } else {
                console.log("[AuthContext] User NOT found, status:", res.status);
                if (res.status === 401) {
                    const hadPreviousAuth = Boolean(userRef.current?.email) || hasStoredAuthMarkers();
                    if (hadPreviousAuth) {
                        console.warn("[AuthContext] 401 received with existing auth markers. Retrying once before logout.");
                        await wait(450);
                        const retryRes = await requestMe();
                        console.log("[AuthContext] fetchMe retry status:", retryRes.status);
                        if (retryRes.ok) {
                            const retryData = await retryRes.json();
                            setUser(retryData.user);
                            persistUserMarkers(retryData.user?.email);
                            return;
                        }
                    }
                    console.log("[AuthContext] 401 confirmed, clearing storage");
                    setUser(null);
                    clearUserMarkers();
                } else {
                    // Keep current user state on non-auth backend hiccups (e.g. 5xx) to avoid UI flicker loops.
                    if (!userRef.current) {
                        setUser(null);
                    }
                }
            }
        } catch (error) {
            console.error("[AuthContext] fetchMe error:", error);
            // Preserve prior session markers on transient network errors.
            if (!userRef.current && !hasStoredAuthMarkers()) {
                setUser(null);
            }
        } finally {
            setLoading(false);
            fetchingRef.current = false;
            console.log("[AuthContext] fetchMe finished");
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
        clearUserMarkers();
    };

    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === "logged_user_email" && !e.newValue) {
                console.log("[AuthContext] Logout detected via storage event");
                setUser(null);
                clearUserMarkers();
                
                // Only redirect if not already on an entry page to avoid loops
                if (window.location.pathname !== "/" && window.location.pathname !== "/get-started") {
                    window.location.href = "/";
                }
            }
        };

        window.addEventListener("storage", handleStorageChange);
        fetchMe();

        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const value = useMemo(() => ({
        user,
        loading,
        refreshUser: fetchMe,
        logout
    }), [user, loading]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
