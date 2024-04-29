import { useSearchParams } from "next/navigation";
import { Layout } from "../../components/layout";
import { useHttpClient } from "../../hooks/http-client";
import { useEffect, useState } from "react";
import { Button, Flex, Heading, Icon, Image, Text } from "@chakra-ui/react";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { MdLocationOn } from "react-icons/md";
import { StarRenderer } from "../../components/services/star-renderer";
import router from "next/router";

const multiplier = {
  "£": 1,
  "££": 2,
  "£££": 3,
  "££££": 4,
};

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

export default function Information({}) {
  const client = useHttpClient();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [service, setService] = useState<Service | undefined>(undefined);
  const [bookingData, setBookingData] = useState<{
    date: string;
    time: string;
    repair: string;
    cost: number;
  }>({ date: "", time: "", repair: "", cost: 0 });
  const repairs = [
    { repair: "Brake Pad Replacement", cost: 250 },
    { repair: "Battery Replacement", cost: 300 },
    { repair: "MOT", cost: 50 },
    { repair: "Tire Replacement", cost: 250 },
    { repair: "Windscreen Replacement", cost: 75 },
    { repair: "Oil Change", cost: 100 },
    { repair: "Full Service", cost: 175 },
  ];
  const isDisabled =
    bookingData.date === "" ||
    bookingData.time === "" ||
    bookingData.repair === "" ||
    bookingData.time < "07:00" ||
    bookingData.time > "20:00";

  useEffect(() => {
    const getService = async (id: string) => {
      const response = await client.get(`getbyid/${id}`);
      const data = (await response.json()) as Service;
      setService(data);
    };

    getService(id ?? "");

    return () => {
      client.stop;
    };
  }, []);

  if (!service) {
    return;
  }

  const onConfirmClick = async () => {
    const bookingId = `${bookingData.date}${bookingData.time}${bookingData.repair}`;
    const response = await client.post("add", {
      json: {
        serviceData: service,
        bookingId: bookingId,
        date: bookingData.date,
        repair: bookingData.repair,
        cost: bookingData.cost,
        time: bookingData.time,
      },
    });
    const data = await response.json();
    router.push(`/confirmation?bookingid=${data}`);
  };

  return (
    <Layout isLoading={false}>
      <Flex flexDirection={"column"}>
        <Flex margin={3}>
          <Image
            src={service.logo}
            boxSize={260}
            borderRadius={15}
            padding={2}
          />
          <Flex flex={1} margin={2} flexDirection={"column"} boxSize={250}>
            <Flex
              bg={"rgba(217, 217, 217)"}
              flex={1}
              paddingLeft={4}
              borderRadius={10}
              marginBottom={2}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Heading fontFamily={"Marmelad, sansSerif"}>
                {service.name}
              </Heading>
              <Text marginRight={3} fontSize={25}>
                Open 7am to 8pm
              </Text>
            </Flex>
            <Flex
              bg={"rgba(217, 217, 217)"}
              flex={1}
              alignItems={"center"}
              paddingLeft={4}
              borderRadius={10}
              marginBottom={2}
              height={"1rem"}
            >
              <Icon as={MdLocationOn} boxSize={8} margin={3} />
              <Text fontSize={25} marginTop={1}>
                {service.address}
              </Text>
            </Flex>
            <Flex justifyContent={"space-between"}>
              <Flex flexDirection={"column"} width={"50%"}>
                <Flex
                  bg={"rgba(217, 217, 217)"}
                  flex={1}
                  paddingLeft={4}
                  borderRadius={10}
                  marginBottom={2}
                  height={"1rem"}
                  alignItems={"center"}
                >
                  <PhoneIcon margin={3} boxSize={7} />{" "}
                  <Text fontSize={25} marginTop={1}>
                    {service.phone}
                  </Text>
                </Flex>
                <Flex
                  bg={"rgba(217, 217, 217)"}
                  flex={1}
                  paddingLeft={4}
                  borderRadius={10}
                  marginBottom={2}
                  height={"1rem"}
                  alignItems={"center"}
                >
                  <EmailIcon margin={3} boxSize={7} />{" "}
                  <Text fontSize={25} marginTop={1}>
                    {service.email}
                  </Text>
                </Flex>
              </Flex>
              <Flex
                width={"50%"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <StarRenderer
                  stars={service.stars}
                  color={"#BBAB19"}
                  size={75}
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex width={"100%"}>
          <Flex
            bg={"#414540"}
            margin={3}
            width={"60%"}
            borderRadius={10}
            flexDirection={"column"}
            paddingBottom={5}
            paddingRight={5}
            paddingLeft={5}
            height={390}
          >
            <Heading
              fontFamily={"Marmelad, sansSerif"}
              color={"#D9D9D9"}
              padding={2}
            >
              Repairs Offered
            </Heading>

            <Flex
              textAlign={"center"}
              justifyContent={"center"}
              height={350}
              alignItems={"center"}
              overflow={"auto"}
            >
              <Flex
                flexDirection={"column"}
                height={"inherit"}
                width={"100%"}
                paddingTop={5}
              >
                {repairs.map(({ repair, cost }) => (
                  <Flex
                    key={repair}
                    justifyItems={"space-between"}
                    padding={2}
                    width={"100%"}
                  >
                    <Button
                      width={"100%"}
                      bg={"rgba(217, 217, 217)"}
                      borderRadius={10}
                      display={"flex"}
                      padding={10}
                      justifyContent={"space-between"}
                      color={"black"}
                      _focus={{ backgroundColor: "#89C6C2" }}
                      onClick={() =>
                        setBookingData({
                          ...bookingData,
                          repair: repair,
                          cost:
                            cost *
                            multiplier[
                              (service.price as "£") || "££" || "£££" || "££££"
                            ],
                        })
                      }
                    >
                      <Text fontSize={25}>{repair}</Text>
                      <Text fontSize={25}>{`£${
                        cost *
                        multiplier[
                          (service.price as "£") || "££" || "£££" || "££££"
                        ]
                      }`}</Text>
                    </Button>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          </Flex>
          <Flex
            bg={"#414540"}
            marginTop={3}
            marginRight={3}
            width={"40%"}
            borderRadius={10}
            flexDirection={"column"}
            paddingBottom={5}
            paddingRight={5}
            paddingLeft={5}
            height={390}
          >
            <Heading
              fontFamily={"Marmelad, sansSerif"}
              color={"#D9D9D9"}
              padding={2}
            >
              Book Now
            </Heading>
            <Flex marginTop={5} flexDirection={"column"}>
              <Flex fontSize={25}>
                <Text margin={3}>Date:</Text>
                <input
                  type="date"
                  min={new Date().toLocaleDateString()}
                  max="2100-12-31"
                  style={{
                    backgroundColor: "#D9D9D9",
                    color: "black",
                    height: 50,
                    padding: 20,
                    borderRadius: 15,
                    width: "100%",
                  }}
                  onChange={(event) =>
                    setBookingData({
                      ...bookingData,
                      date: event.target.value,
                    })
                  }
                />
              </Flex>
              <Flex fontSize={25} marginTop={3}>
                <Text margin={3}>Time:</Text>
                <input
                  type="time"
                  min="09:00"
                  max="18:00"
                  step="900"
                  onChange={(event) =>
                    setBookingData({
                      ...bookingData,
                      time: event.target.value,
                    })
                  }
                  style={{
                    backgroundColor: "#D9D9D9",
                    color: "black",
                    height: 50,
                    padding: 20,
                    borderRadius: 15,
                    width: "100%",
                  }}
                />
              </Flex>
              <Flex
                fontSize={25}
                marginTop={3}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Text margin={2}>Repair:</Text>
                <Text
                  backgroundColor={"#D9D9D9"}
                  textColor={"black"}
                  minHeight={50}
                  display={"flex"}
                  alignItems={"center"}
                  padding={3}
                  borderRadius={15}
                  width={"100%"}
                >
                  {bookingData.repair !== "" &&
                    `${bookingData.repair}, £${bookingData.cost}`}
                </Text>
              </Flex>
              <Button
                marginTop={6}
                height={16}
                fontSize={25}
                bg={"#89C6C2"}
                isDisabled={isDisabled}
                onClick={onConfirmClick}
              >
                Confirm Booking
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
}
