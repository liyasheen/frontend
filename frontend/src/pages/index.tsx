import { Box, Select, Text, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";

type service = {
  name: string;
  age: string;
  location: string;
};

export default function HomePage() {
  const [car, setCar] = useState<string | undefined>(undefined);
  const [location, setLocation] = useState<string | undefined>(undefined);
  const router = useRouter();

  const isSearchDisabled =
    typeof location !== "string" || typeof car !== "string";

  const cities = [
    { location: "London" },
    { location: "Birmingham" },
    { location: "Manchester" },
    { location: "York" },
    { location: "Leeds" },
    { location: "Coventry" },
  ];
  const carTypes = [
    { car: "BMW" },
    { car: "Mercedes" },
    { car: "Volvo" },
    { car: "Jeep" },
    { car: "Range Rover" },
    { car: "Ford" },
    { car: "Lexus" },
  ];

  const onCarSelected = (event: { target: { value: any } }) => {
    const selectedValue = event.target.value;
    selectedValue === "" ? setCar(undefined) : setCar(selectedValue);
  };

  const onLocationSelected = (event: { target: { value: any } }) => {
    const selectedValue = event.target.value;
    selectedValue === "" ? setLocation(undefined) : setLocation(selectedValue);
  };

  const onSearchClicked = async () => {
    router.push(`/services?location=${location}&car=${car}`);
  };

  return (
    <Box
      position={"absolute"}
      textAlign={"center"}
      margin={"auto"}
      height={"80vh"}
      width={"75%"}
      top={"7rem"}
      left={0}
      right={0}
      backgroundColor={"rgba(217, 217, 217, 0.8)"}
      borderRadius={27}
    >
      <Box paddingTop={"15%"}>
        <Text fontSize={56}>Search for your local repair...</Text>
        <Box display={"flex"} justifyContent={"space-between"} padding={"40px"}>
          <Select
            placeholder="Select City"
            size="lg"
            bg={"#D9D9D9"}
            borderColor={"#D9D9D9"}
            width={"60%"}
            fontSize={35}
            height={"4rem"}
            onChange={onLocationSelected}
          >
            {cities.map(({ location }) => {
              return (
                <option key={location} value={location}>
                  {location}
                </option>
              );
            })}
          </Select>
          <Select
            placeholder="Select Car"
            size="lg"
            borderColor={"#D9D9D9"}
            bg={"#D9D9D9"}
            width={"38%"}
            height={"4rem"}
            fontSize={35}
            alignItems={"center"}
            onChange={onCarSelected}
          >
            {carTypes.map(({ car }) => {
              return <option key={car} value={car}>{car}</option>;
            })}
          </Select>
        </Box>
        <Button
          fontSize={35}
          borderColor={"#D9D9D9"}
          bg={"#89C6C2"}
          width={"38%"}
          height={"4rem"}
          marginTop={"2rem"}
          onClick={onSearchClicked}
          isDisabled={isSearchDisabled}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
}
