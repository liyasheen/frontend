import { useContext } from "react";

import { HttpClientContext } from "../../providers";

export function useHttpClient() {
  const client = useContext(HttpClientContext);

  if (!client) {
    throw new Error("useHttpClient must be used within a HttpClientProvider");
  }

  return client;
}
