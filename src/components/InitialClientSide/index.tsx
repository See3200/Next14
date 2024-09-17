"use client";

import AppStore from "@/store/AppStore";
import { useEffect } from "react";

type PropsType = {
  isLoggedIn: boolean;
};

export const InitialClientSide = ({ isLoggedIn }: PropsType) => {
  const { setIsAuthenticated } = AppStore();
  useEffect(() => {
    setIsAuthenticated(isLoggedIn);
  }, []);

  return <div />;
};
