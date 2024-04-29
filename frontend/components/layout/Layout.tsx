import { Box, Select, Text, Button, Flex, Spinner } from "@chakra-ui/react";
import { ChangeEventHandler, ReactEventHandler, useState } from "react";
import { useHttpClient } from "../../hooks/http-client";

type Test = {
  services: {
    name: string;
    age: string;
    location: string;
  }[];
};

export function Layout({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading: boolean;
}) {
  return (
    <Flex>
      <Flex
        width={"100%"}
        height={"calc(100vh - 4rem)"}
        alignItems={"center"}
        bg={"#89C6C2"}
        opacity={"0.5"}
        justifyContent={"center"}
        hidden={!isLoading}
        zIndex={99999}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
      <Box
        position={"absolute"}
        textAlign={"center"}
        margin={"auto"}
        height={"87vh"}
        width={"90%"}
        top={"5rem"}
        left={0}
        right={0}
        backgroundColor={"rgba(217, 217, 217, 0.8)"}
        borderRadius={27}
        overflow={"hidden"}
      >
        {children}
      </Box>
    </Flex>
  );
}
