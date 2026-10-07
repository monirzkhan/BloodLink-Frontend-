"use client";

import React, { ReactNode } from "react";
import QueryProvider from "./query.provider";
import GoogleAuthProvider from "./google-auth.provider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <GoogleAuthProvider>
      <QueryProvider>{children}</QueryProvider>
    </GoogleAuthProvider>
  );
};

export default Providers;
