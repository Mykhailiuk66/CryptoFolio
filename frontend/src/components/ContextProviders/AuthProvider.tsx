import { useCallback, useEffect, useState } from "react";
import AuthContext from "../../store/AuthContext";
import { AuthContextType, AuthTokensType, UserType } from "../../types";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../http";

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const authTokensRaw = localStorage.getItem("authTokens")

  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useState<AuthTokensType | null>(() =>
    authTokensRaw ? JSON.parse(authTokensRaw!) : null
  );
  const [user, setUser] = useState<UserType | null>(() =>
    authTokensRaw ? jwtDecode(authTokensRaw!) : null
  );
  const [loading, setLoading] = useState(true);
  const [registerErrors, setRegisterErrors] = useState<Record<string, string[]>>({});

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegisterErrors({});

    const formData = e.target as HTMLFormElement;

    const response = await fetch(`${BASE_URL}/api/account/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username.value,
        email: formData.email.value,
        password: formData.password.value,
        password2: formData.password2.value,
      }),
    });

    const data = await response.json();

    if (response.status === 400) {
      setRegisterErrors(data);
    } else if (response.status === 201) {
      navigate(0);
    } else {
      alert("Registration failed. Please try again.");
    }
  };

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = e.target as HTMLFormElement;

    const response = await fetch(`${BASE_URL}/api/account/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email.value,
        password: formData.password.value,
      }),
    });
    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } else {
      alert("Something went wrong!");
    }
  };

  const logoutUser = useCallback(() => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  }, []);

  const updateToken = useCallback(async () => {
    const response = await fetch(`${BASE_URL}/api/account/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: authTokens?.refresh,
      }),
    });
    const data = await response.json();

    if (response.ok) {
      setAuthTokens((prevState) => {
        return {
          refresh: prevState?.refresh!,
          access: data.access,
        };
      });
      setUser(jwtDecode(data.access));
      localStorage.setItem(
        "authTokens",
        JSON.stringify({
          refresh: authTokens?.refresh,
          access: data.access,
        })
      );
    } else {
      logoutUser();
    }

    if (loading) {
      setLoading(false);
    }
  }, [authTokens?.refresh, loading, logoutUser]);

  useEffect(() => {
    if (authTokens) {
      if (loading) {
        updateToken();
      }
      const nineMinutes = 1000 * 60 * 9;
      const interval = setInterval(() => {
        if (authTokens) {
          updateToken();
        }
      }, nineMinutes);
      return () => clearInterval(interval);
    }
  }, [authTokens, loading, updateToken]);

  const contextData: AuthContextType = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    registerUser: registerUser,
    registerErrors: registerErrors,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
