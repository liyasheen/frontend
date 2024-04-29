import { Flex } from "@chakra-ui/react";
import WithAction from "../nav-bar/NavBar";
export function HomepageLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex direction="column">
      <WithAction />
      {children}
    </Flex>
  );
}
