import { StarIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/react";
import { FC } from "react";

export const StarRenderer: FC<{
  stars: number;
  color: string;
  size: number;
}> = ({ stars, color, size }) => {
  const numberOfStars = Array.from({ length: stars }, (_value, index) => index);
  return (
    <Flex>
      {numberOfStars.map((x) => (
        <StarIcon key={x} color={color} paddingRight={2} boxSize={size} />
      ))}
    </Flex>
  );
};
