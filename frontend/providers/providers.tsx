import { ChakraProvider } from "./chakra-provider";
import { HttpClientProvider } from "./http-client-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HttpClientProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </HttpClientProvider>
  );
}
