import {
  Box,
  Select,
  Text,
  Button,
  Heading,
  Flex,
  Image,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useHttpClient } from "../../hooks/http-client";
import { Layout } from "../../components/layout/Layout";
import { useSearchParams } from "next/navigation";
import { StarRenderer } from "../../components/services/star-renderer";
import router from "next/router";

export type Service = {
  address: string;
  id: string;
  name: string;
  distance: number;
  location: string;
  logo: string;
  price: string;
  stars: number;
};

export type Services = {
  services: Service[];
};

export default function Services({}) {
  const searchParams = useSearchParams();
  const car = searchParams.get("car");
  const location = searchParams.get("location");
  const [data, setData] = useState<Services | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rating, setRating] = useState<number[]>([]);
  const priceArray = ["£", "££", "£££", "££££"];
  const [cost, setCost] = useState<string[]>([]);
  const client = useHttpClient();

  const getData = async (
    location: string | null,
    price: string[],
    stars: number[]
  ) => {
    setIsLoading(true);
    const response = await client.post("filter", {
      json: {
        location: location,
        price: price,
        stars: stars,
      },
    });
    const data = (await response.json()) as Services;
    setData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    const costValues = cost.length === 0 ? priceArray : cost;
    const ratingValues = rating.length === 0 ? [1, 2, 3, 4, 5] : rating;
    getData(location, costValues, ratingValues);
    return () => {
      client.stop;
    };
  }, [cost, rating]);

  if (!data) {
    return;
  }

  const onMoreInfoClicked = (id: string) => {
    console.log("id", id);
    router.push(`/information?id=${id}`);
  };

  const onCostChecked = (event: ChangeEvent<HTMLInputElement>): void => {
    const checked = event.target.checked;
    const value = event.target.value;
    checked
      ? setCost([...cost, value])
      : setCost(cost.filter((item) => item !== value));
  };

  const onRatingChecked = (event: ChangeEvent<HTMLInputElement>): void => {
    const checked = event.target.checked;
    const value = event.target.value;
    checked
      ? setRating([...rating, parseInt(value)])
      : setRating(rating.filter((item) => item !== parseInt(value)));
  };
  const onSortChanged = (event: { target: { value: string } }) => {
    if (event.target.value === "disance_desc") {
      setData({
        services: data.services.sort((a, b) => b.distance - a.distance),
      });
    } else {
      setData({
        services: data.services.sort((a, b) => a.distance - b.distance),
      });
    }
  };

  return (
    <Layout isLoading={false}>
      <Box>
        <Flex
          backgroundColor={"rgba(217, 217, 217)"}
          borderRadius={10}
          margin={5}
          padding={5}
          justifyContent={"left"}
        >
          <Heading fontFamily={"Marmelad, sansSerif"}>
            {`Search results for ${car} services in ${location}`}
          </Heading>
        </Flex>
        <Select
          placeholder="Sort"
          size="lg"
          border={"none"}
          width={"35%"}
          height={"5vh"}
          fontSize={"3.5vh"}
          textAlign={"right"}
          marginLeft={"auto"}
          marginRight={"2rem"}
          onChange={onSortChanged}
        >
          <option value={"distance_asc"}>Sort By: Distance Ascending</option>;
          <option value={"disance_desc"}>Sort By: Distance Descending</option>;
        </Select>
        <Flex justifyContent={"space-between"}>
          <Flex
            backgroundColor={"#414540"}
            borderRadius={10}
            textAlign={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            width={360}
            height={500}
            marginLeft={"2rem"}
          >
            <Heading
              fontFamily={"Marmelad, sansSerif"}
              color={"#FFFDFD"}
              paddingTop={3}
              paddingBottom={3}
            >
              Filters
            </Heading>

            <Flex
              backgroundColor={"rgba(217, 217, 217)"}
              borderRadius={10}
              margin={2}
              width={340}
              flexDirection={"column"}
            >
              <Heading
                margin={2}
                fontFamily={"Marmelad, sansSerif"}
                textAlign={"left"}
                fontSize={30}
              >
                Cost
              </Heading>
              <Stack spacing={2} direction="column" margin={2}>
                {priceArray.map((cost) => (
                  <Checkbox
                    size={"lg"}
                    key={cost}
                    value={cost}
                    onChange={onCostChecked}
                  >
                    {cost}
                  </Checkbox>
                ))}
              </Stack>
            </Flex>
            <Flex
              backgroundColor={"rgba(217, 217, 217)"}
              borderRadius={10}
              margin={2}
              width={340}
              flexDirection={"column"}
            >
              <Heading
                margin={2}
                fontFamily={"Marmelad, sansSerif"}
                textAlign={"left"}
                fontSize={30}
              >
                Rating
              </Heading>
              <Stack spacing={2} direction="column" margin={2}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Checkbox
                    size={"lg"}
                    key={star}
                    value={star}
                    onChange={onRatingChecked}
                  >
                    <StarRenderer
                      key={star}
                      color={"black"}
                      stars={star}
                      size={5}
                    />
                  </Checkbox>
                ))}
              </Stack>
            </Flex>
          </Flex>
          <Flex
            backgroundColor={"rgba(217, 217, 217)"}
            borderRadius={10}
            textAlign={"center"}
            justifyContent={"center"}
            width={850}
            height={500}
            marginRight={"2rem"}
            alignItems={"center"}
            overflow={"auto"}
          >
            {data.services.length === 0 ? (
              <Flex justifyContent={"center"}>
                <Heading fontFamily={"Marmelad, sansSerif"}>No results</Heading>
              </Flex>
            ) : (
              <Flex height={"inherit"} flexDirection={"column"}>
                {data.services.map((x) => (
                  <Flex
                    backgroundColor={"#414540"}
                    borderRadius={10}
                    margin={2}
                    width={825}
                    height={200}
                    key={x.id}
                  >
                    <Image
                      src={x.logo}
                      boxSize={200}
                      borderRadius={15}
                      padding={2}
                    />
                    <Flex
                      flexDirection={"column"}
                      textAlign={"left"}
                      paddingLeft={3}
                      width={"100%"}
                    >
                      <Heading
                        fontFamily={"Marmelad, sansSerif"}
                        color={"#FFFDFD"}
                        paddingTop={3}
                        paddingBottom={3}
                      >
                        {x.name}
                      </Heading>
                      <Text
                        color={"#FFFDFD"}
                        fontSize={22}
                      >{`${x.distance} miles away, ${x.price}`}</Text>
                      <Text color={"#FFFDFD"} fontSize={22}>
                        {x.address}
                      </Text>
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"flex-end"}
                      >
                        <StarRenderer
                          color={"#BBAB19"}
                          stars={x.stars}
                          size={12}
                        />
                        <Button
                          borderColor={"#89C6C2"}
                          bg={"#89C6C2"}
                          right={3}
                          fontSize={20}
                          id={x.id}
                          onClick={() => onMoreInfoClicked(x.id)}
                        >
                          More Info
                        </Button>
                      </Flex>
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            )}
          </Flex>
        </Flex>
      </Box>
    </Layout>
  );
}
