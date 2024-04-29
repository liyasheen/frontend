import { Flex, Spacer } from "@chakra-ui/react";

export function Header() {
  return (
    <Flex
      backgroundColor={"pink"}
      boxShadow={"sm"}
      top={0}
      padding={5}
      position={"sticky"}
      zIndex={Number.MAX_SAFE_INTEGER}
    ></Flex>
  );
}
