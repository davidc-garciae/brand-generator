import { useCallback, useEffect, useState } from "react";
import AuthService, { type User } from "../services/auth-service";

const USER_STORAGE_KEY = "currentUser";

type RegisterPayload = {
  email: string;
  password: string;
  name?: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthLoading: boolean;
  error: string | null;
  login: (payload: LoginPayload) => Promise<User | null>;
  register: (payload: RegisterPayload) => Promise<User | null>;
  logout: () => Promise<void>;
  me: () => Promise<User | null>;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // @AFOR si ves tantos useCallbacks es porque aun no se si en react19 no hay problema de renderizado.
  const saveUserToLocalStorage = useCallback((user: User | null) => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, []);

  const fetchAndSetUser = useCallback(async (): Promise<User | null> => {
    try {
      const currentUser = await AuthService.me();
      setUser(currentUser);
      saveUserToLocalStorage(currentUser);
      setError(null);
      return currentUser;
    } catch (err: unknown) {
      setUser(null);
      saveUserToLocalStorage(null);
      if (err instanceof Error) {
        setError(err.message || "Failed to fetch current user.");
      } else {
        setError(null);
      }
      return null;
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsAuthLoading(true);
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e: unknown) {
          if (e instanceof Error) {
            setError(e.message || "Failed to parse stored user.");
          }
          saveUserToLocalStorage(null);
        }
      }
      await fetchAndSetUser();
      setIsAuthLoading(false);
    };
    initializeAuth();
  }, [fetchAndSetUser]);

  const login = useCallback(
    async (payload: LoginPayload): Promise<User | null> => {
      setIsLoading(true);
      setError(null);
      try {
        await AuthService.login(payload);
        const currentUser = await fetchAndSetUser();
        setIsLoading(false);
        return currentUser;
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Login failed.");
        }
        setUser(null);
        saveUserToLocalStorage(null);
        setIsLoading(false);
        return null;
      }
    },
    [fetchAndSetUser]
  );

  const register = useCallback(
    async (payload: RegisterPayload): Promise<User | null> => {
      setIsLoading(true);
      setError(null);
      try {
        await AuthService.register(payload);
        await AuthService.login({
          email: payload.email,
          password: payload.password,
        });
        const currentUser = await fetchAndSetUser();
        setIsLoading(false);
        return currentUser;
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Registration failed.");
        }
        setUser(null);
        saveUserToLocalStorage(null);
        setIsLoading(false);
        return null;
      }
    },
    [fetchAndSetUser]
  );

  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await AuthService.logout();
      setUser(null);
      saveUserToLocalStorage(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Logout failed.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const me = useCallback(async (): Promise<User | null> => {
    setIsLoading(true);
    const fetchedUser = await fetchAndSetUser();
    setIsLoading(false);
    return fetchedUser;
  }, [fetchAndSetUser]);

  return {
    user,
    isLoading,
    isAuthLoading,
    error,
    login,
    register,
    logout,
    me,
  };
};
