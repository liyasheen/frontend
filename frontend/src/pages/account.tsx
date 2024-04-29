import { Button, Flex, Heading, Icon, Image, Text } from "@chakra-ui/react";
import { Layout } from "../../components/layout";

export default function Account({}) {
  return (
    <Layout isLoading={false}>
      <Flex margin={5} flexDirection={"column"}>
        <Flex>
          <Image
            src={"profile.png"}
            boxSize={260}
            borderRadius={15}
            padding={2}
          />
          <Flex
            flexDirection={"column"}
            width={"100%"}
            textAlign={"left"}
            margin={5}
          >
            <Heading fontFamily={"Marmelad, sansSerif"} fontSize={60}>
              My Account
            </Heading>
            <Flex
              bg={"#D9D9D9"}
              margin={3}
              alignItems={""}
              flexDirection={"column"}
              width={"100%"}
              borderRadius={15}
              padding={5}
            >
              <Text fontSize={30}>Harry John</Text>
              <Text fontSize={30}>07464297251</Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          bg={"#414540"}
          marginTop={3}
          marginRight={3}
          width={"100%"}
          borderRadius={10}
          flexDirection={"column"}
          paddingBottom={5}
          paddingRight={5}
          paddingLeft={5}
          height={390}
          fontSize={30}
        >
          <Flex
            padding={5}
            paddingTop={10}
            paddingBottom={5}
            alignItems={"center"}
          >
            <Text textColor={"#D9D9D9"}>Address:</Text>
            <Flex
              bg={"#D9D9D9"}
              width={"100%"}
              marginLeft={5}
              alignItems={"center"}
              borderRadius={15}
              paddingLeft={3}
            >
              49 Acorn Street, London, BH6 2LP
            </Flex>
          </Flex>
          <Flex padding={5} paddingBottom={5} alignItems={"center"}>
            <Text textColor={"#D9D9D9"}>Email:</Text>
            <Flex
              bg={"#D9D9D9"}
              width={"100%"}
              marginLeft={5}
              alignItems={"center"}
              borderRadius={15}
              paddingLeft={3}
            >
              harryjohn@gmail.com
            </Flex>
          </Flex>
          <Flex padding={5} paddingBottom={5} alignItems={"center"}>
            <Text textColor={"#D9D9D9"}>Birthday:</Text>
            <Flex
              bg={"#D9D9D9"}
              marginLeft={5}
              width={"100%"}
              alignItems={"center"}
              borderRadius={15}
              paddingLeft={3}
            >
              6th May, 1996
            </Flex>
          </Flex>
          <Flex justifyContent={"center"}>
            <Button
              bg={"#89C6C2"}
              width={"50%"}
              fontSize={25}
              padding={7}
              marginTop={5}
            >
              Sign Out
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
}
