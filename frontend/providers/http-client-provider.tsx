import React, { createContext, useState } from "react";
import ky from "ky";

export type HttpClient = typeof ky;

export const HttpClientContext = createContext<HttpClient | null>(null);

type HttpClientProviderProps = {
  children: React.ReactNode;
};

export function HttpClientProvider({ children }: HttpClientProviderProps) {
  const [client] = useState(() =>
    ky.create({
      prefixUrl: process.env.NEXT_PUBLIC_API_URL,
    })
  );

  return (
    <HttpClientContext.Provider value={client}>
      {children}
    </HttpClientContext.Provider>
  );
}
