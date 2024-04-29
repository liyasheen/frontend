import { useEffect, useState } from "react";
import { Layout } from "../../components/layout";
import { Flex, Heading, Icon, Text, Image } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useHttpClient } from "../../hooks/http-client";
import { CiCircleCheck } from "react-icons/ci";

export type Service = {
  address: string;
  id: string;
  name: string;
  distance: number;
  location: string;
  logo: string;
  price: string;
  stars: number;
  phone: string;
  email: string;
};

export type BookingDetails = {
  serviceData: Service;
  bookingId: string;
  date: string;
  repair: string;
  time: string;
};

export default function Confirmation({}) {
  const client = useHttpClient();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingid");
  const [confirmation, setConfirmation] = useState<BookingDetails | undefined>(
    undefined
  );

  useEffect(() => {
    const getService = async (id: string) => {
      const response = await client.get(`getbookingbyid/${bookingId}`);
      const data = (await response.json()) as BookingDetails;
      setConfirmation(data);
    };

    getService(bookingId ?? "");

    return () => {
      client.stop;
    };
  }, []);

  if (!confirmation) {
    return;
  }

  return (
    <Layout isLoading={false}>
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Flex>
          <Icon
            marginTop={10}
            boxSize={200}
            as={CiCircleCheck}
            color={"#8BA356"}
          />
        </Flex>
        <Heading marginTop={5} fontFamily={"Marmelad, sansSerif"}>
          Booking Confirmed
        </Heading>
        <Text marginTop={5} fontSize={25}>
          Thank you for booking with Car Repair Service Near You
        </Text>
        <Flex
          bg={"#414540"}
          width={"95%"}
          marginTop={5}
          borderRadius={15}
          justifyContent={"space-between"}
        >
          <Image
            src={confirmation.serviceData.logo}
            boxSize={260}
            borderRadius={15}
            padding={2}
          />
          <Flex
            bg={"#D9D9D9"}
            margin={2}
            width={"100%"}
            borderRadius={15}
            textAlign={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            <Heading fontFamily={"Marmelad, sansSerif"} color={"black"}>
              {confirmation.serviceData.name}
            </Heading>
            <Text
              fontSize={30}
              color={"#8BA356"}
            >{`${confirmation.time} on ${confirmation.date}`}</Text>
            <Text fontSize={25}>{confirmation.serviceData.address}</Text>
            <Text fontSize={25}>{confirmation.serviceData.phone}</Text>
            <Text fontSize={25}>{confirmation.serviceData.email}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
}
