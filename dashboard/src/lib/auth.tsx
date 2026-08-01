import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { api } from "./api";

type AuthCtx = {
  token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("rw-admin-token")
  );

  const value = useMemo<AuthCtx>(
    () => ({
      token,
      async signIn(email: string, password: string) {
        const { data } = await api.post<{ accessToken: string }>("/auth/login", {
          email,
          password,
        });
        localStorage.setItem("rw-admin-token", data.accessToken);
        setToken(data.accessToken);
      },
      signOut() {
        localStorage.removeItem("rw-admin-token");
        setToken(null);
      },
    }),
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth outside provider");
  return ctx;
}
