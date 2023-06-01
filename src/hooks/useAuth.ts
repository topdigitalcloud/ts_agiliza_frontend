import { useState, useEffect } from "react";
import useAppSelector from "./useAppSelector";
import { loginSelector } from "../slices/LoginSlice";

export const useAuth = () => {
  const { user } = useAppSelector(loginSelector);

  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setAuth(true);
    } else {
      setAuth(false);
    }
    setLoading(false);
  }, [user]);

  return { auth, loading };
};
