import { Button, Collapse, Flex, Heading, Text, Image } from "@chakra-ui/react";
import { Layout } from "../../components/layout";
import { useEffect, useState } from "react";
import { useHttpClient } from "../../hooks/http-client";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import router from "next/router";
import { EditModal } from "../../components/services/EditModal";

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

export type Booking = {
  serviceData: Service;
  bookingId: string;
  date: string;
  repair: string;
  time: string;
  cost: number;
};

export default function Bookings({}) {
  const [showBookings, setShowBookings] = useState<boolean>(false);
  const [showPastBookings, setShowPastBookings] = useState<boolean>(false);
  const [bookings, setBookings] = useState<Booking[] | undefined>(undefined);
  const [upcomingBookings, setUpcomingBookings] = useState<
    Booking[] | undefined
  >(undefined);
  const [pastBookings, setPastBookings] = useState<Booking[] | undefined>(
    undefined
  );
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const client = useHttpClient();

  const onCancelClicked = async (id: string) => {
    const response = await client.post(`remove/${id}`);
    const data = (await response.json()) as Booking[];
    updateData(data);
  };

  const onMoreInfoClicked = (id: string) => {
    router.push(`/information?id=${id}`);
  };
  const updateData = (data: Booking[]) => {
    const filterPastBookings = data?.filter(({ date }) => {
      return new Date(date) < new Date();
    });
    const filterUpcomingBookings = data?.filter(({ date }) => {
      return new Date(date) > new Date();
    });
    setBookings(data);
    setPastBookings(filterPastBookings);
    setUpcomingBookings(filterUpcomingBookings);
  };

  const onConfirmClicked = async (
    serviceData: Service,
    bookingId: string,
    date: string,
    repair: string,
    cost: number,
    time: string
  ) => {
    const response = await client.post(`update/${bookingId}`, {
      json: {
        serviceData: serviceData,
        bookingId: bookingId,
        date: date,
        repair: repair,
        cost: cost,
        time: time,
      },
    });
    const data = (await response.json()) as Booking[];
    updateData(data);
    setShowEditModal(false);
  };

  useEffect(() => {
    const getBookings = async () => {
      const response = await client.get(`getbookings`);
      const data = (await response.json()) as Booking[];
      updateData(data);
    };

    getBookings();

    return () => {
      client.stop;
    };
  }, []);

  if (!bookings) {
    return;
  }

  return (
    <Layout isLoading={false}>
      <Flex flexDirection={"column"} padding={10}>
        <Heading fontFamily={"Marmelad, sansSerif"} fontSize={55}>
          My Bookings
        </Heading>
        <Flex flexDirection={"column"} paddingTop={5}>
          <Button
            bg={"#414540"}
            marginTop={2}
            display={"flex"}
            padding={7}
            fontSize={25}
            justifyContent={"left"}
            textColor={"#D9D9D9"}
            width={"100%"}
            onClick={() => {
              setShowBookings(!showBookings);
            }}
          >
            {showBookings ? <ChevronUpIcon /> : <ChevronDownIcon />} Upcoming
            Bookings
          </Button>
          <Collapse in={showBookings} animateOpacity>
            <Flex padding={3} mt={5} flexDirection={"column"}>
              {upcomingBookings?.length === 0 ||
              upcomingBookings === undefined ? (
                <Text fontSize={20}>No upcoming bookings</Text>
              ) : (
                upcomingBookings?.map(
                  ({ serviceData, bookingId, time, date, repair, cost }) => (
                    <Flex
                      key={bookingId}
                      width={"100%"}
                      borderRadius={15}
                      marginBottom={3}
                      bg={"#D9D9D9"}
                      borderBottom={"black"}
                      padding={3}
                    >
                      <Image
                        src={serviceData.logo}
                        boxSize={"15vh"}
                        borderRadius={15}
                      />
                      <Flex justifyContent={"space-between"} width={"100%"}>
                        <Flex textAlign={"left"} flexDirection={"column"}>
                          <Flex marginTop={3}>
                            <Heading
                              marginLeft={3}
                              fontFamily={"Marmelad, sansSerif"}
                            >
                              {serviceData.name}
                            </Heading>
                            <Heading
                              marginLeft={3}
                              fontFamily={"Marmelad, sansSerif"}
                              textColor={"#8BA356"}
                            >{`${time} on ${date}`}</Heading>
                          </Flex>
                          <Text marginLeft={3} fontSize={20}>
                            {`${repair}, £${cost}`}
                          </Text>
                          <Text marginLeft={3} fontSize={20}>
                            {serviceData.address}
                          </Text>
                        </Flex>
                        <Flex
                          flexDirection={"column"}
                          fontSize={20}
                          textAlign={"right"}
                        >
                          <Text>{serviceData.phone}</Text>
                          <Text>{serviceData.email}</Text>
                          <Flex marginTop={3}>
                            <Button
                              marginLeft={2}
                              bg={"#414540"}
                              onClick={() => setShowEditModal(!showEditModal)}
                            >
                              Edit
                            </Button>
                            <Button
                              marginLeft={2}
                              bg={"#4C80B0"}
                              onClick={() => onCancelClicked(bookingId)}
                            >
                              Cancel Booking
                            </Button>
                            <Button
                              marginLeft={2}
                              bg={"#89C6C2"}
                              onClick={() => onMoreInfoClicked(serviceData.id)}
                            >
                              More Info
                            </Button>
                          </Flex>
                        </Flex>
                      </Flex>
                      <EditModal
                        serviceData={serviceData}
                        isOpen={showEditModal}
                        onClose={() => setShowEditModal(false)}
                        repair={repair}
                        time={time}
                        cost={cost}
                        date={date}
                        onConfirmClicked={onConfirmClicked}
                        bookingId={bookingId}
                      />
                    </Flex>
                  )
                )
              )}
            </Flex>
          </Collapse>
        </Flex>
        <Flex flexDirection={"column"} paddingTop={5}>
          <Button
            bg={"#414540"}
            marginTop={2}
            display={"flex"}
            padding={7}
            fontSize={25}
            justifyContent={"left"}
            textColor={"#D9D9D9"}
            width={"100%"}
            onClick={() => {
              setShowPastBookings(!showPastBookings);
            }}
          >
            {showPastBookings ? <ChevronUpIcon /> : <ChevronDownIcon />}
            Past Bookings
          </Button>
          <Collapse in={showPastBookings} animateOpacity>
            <Flex padding={3} mt={5} flexDirection={"column"}>
              {pastBookings?.length === 0 || pastBookings === undefined ? (
                <Text fontSize={20}>No past bookings</Text>
              ) : (
                pastBookings?.map(
                  ({ serviceData, bookingId, time, date, repair, cost }) => (
                    <Flex
                      key={bookingId}
                      width={"100%"}
                      borderRadius={15}
                      marginBottom={3}
                      bg={"#D9D9D9"}
                      borderBottom={"black"}
                      padding={3}
                    >
                      <Image
                        src={serviceData.logo}
                        boxSize={"15vh"}
                        borderRadius={15}
                      />
                      <Flex justifyContent={"space-between"} width={"100%"}>
                        <Flex textAlign={"left"} flexDirection={"column"}>
                          <Flex marginTop={3}>
                            <Heading
                              marginLeft={3}
                              fontFamily={"Marmelad, sansSerif"}
                            >
                              {serviceData.name}
                            </Heading>
                            <Heading
                              marginLeft={3}
                              fontFamily={"Marmelad, sansSerif"}
                              textColor={"#8BA356"}
                            >{`${time} on ${date}`}</Heading>
                          </Flex>
                          <Text marginLeft={3} fontSize={20}>
                            {`${repair}, £${cost}`}
                          </Text>
                          <Text marginLeft={3} fontSize={20}>
                            {serviceData.address}
                          </Text>
                        </Flex>
                        <Flex
                          flexDirection={"column"}
                          fontSize={20}
                          textAlign={"right"}
                        >
                          <Text>{serviceData.phone}</Text>
                          <Text>{serviceData.email}</Text>
                          <Flex marginTop={3} justifyContent={"right"}>
                            <Button
                              bg={"#89C6C2"}
                              onClick={() => onMoreInfoClicked(serviceData.id)}
                            >
                              More Info
                            </Button>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                  )
                )
              )}
            </Flex>
          </Collapse>
        </Flex>
      </Flex>
    </Layout>
  );
}
