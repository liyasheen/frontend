"use client";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  Icon,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  CalendarIcon,
} from "@chakra-ui/icons";
import Link from "next/link";
import router from "next/router";

interface Props {
  children: React.ReactNode;
}

const Links = ["Dashboard", "Projects", "Team"];

const NavLink = (props: Props) => {
  const { children } = props;
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("pink", "red"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default function WithAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue("#414540", "gray.600")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Link href={`/homepage`}>
              <Image boxSize="563px" h={16} objectFit="cover" src="Logo.png" />
            </Link>
          </Box>
          <Flex alignItems={"center"}>
            <IconButton
              isRound={true}
              variant="solid"
              colorScheme={"#414540"}
              aria-label="Done"
              boxSize={10}
              margin={3}
              icon={<CalendarIcon boxSize={7} color="#D9D9D9" />}
              onClick={() => router.push(`/bookings`)}
            />

            <IconButton
              isRound={true}
              variant="solid"
              colorScheme="teal"
              aria-label="Done"
              icon={<Avatar size={"sm"} src={"profile.png"} />}
              onClick={() => router.push(`/account`)}
            />
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
