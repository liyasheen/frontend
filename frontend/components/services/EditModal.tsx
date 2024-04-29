import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
} from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useHttpClient } from "../../hooks/http-client";

export type EditData = {
  repair: string;
  date: string;
  cost: number;
  time: string;
};

const repairs = [
  { repair: "Brake Pad Replacement", cost: 250 },
  { repair: "Battery Replacement", cost: 300 },
  { repair: "MOT", cost: 50 },
  { repair: "Tire Replacement", cost: 250 },
  { repair: "Windscreen Replacement", cost: 75 },
  { repair: "Oil Change", cost: 100 },
  { repair: "Full Service", cost: 175 },
];

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

export const EditModal: FC<{
  serviceData: Service;
  repair: string;
  date: string;
  cost: number;
  time: string;
  isOpen: boolean;
  bookingId: string;
  onClose: () => void;
  onConfirmClicked: (
    serviceData: Service,
    bookingId: string,
    date: string,
    repair: string,
    cost: number,
    time: string
  ) => Promise<void>;
}> = ({
  serviceData,
  repair,
  date,
  cost,
  time,
  isOpen,
  onClose,
  bookingId,
  onConfirmClicked,
}) => {
  const [editedData, setEditedData] = useState<EditData>({
    repair,
    date,
    cost,
    time,
  });
  const isDisabled =
    editedData.date === "" ||
    editedData.time === "" ||
    editedData.repair === "" ||
    editedData.time < "07:00" ||
    editedData.time > "20:00";
  const onConfirm = () => {
    onConfirmClicked(
      serviceData,
      bookingId,
      editedData.date,
      editedData.repair,
      editedData.cost,
      editedData.time
    );
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={25}>Edit Booking</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex marginTop={5} flexDirection={"column"}>
            <Flex fontSize={25}>
              <Text margin={3}>Date:</Text>
              <input
                defaultValue={date}
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
                  setEditedData({
                    ...editedData,
                    date: event.target.value,
                  })
                }
              />
            </Flex>
            <Flex fontSize={25} marginTop={3}>
              <Text margin={3}>Time:</Text>
              <input
                defaultValue={time}
                type="time"
                min="09:00"
                max="18:00"
                step="900"
                onChange={(event) =>
                  setEditedData({
                    ...editedData,
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
              <Select
                placeholder="Select Repair"
                size="lg"
                borderColor={"#D9D9D9"}
                bg={"#D9D9D9"}
                width={"100%"}
                height={"4rem"}
                fontSize={25}
                alignItems={"center"}
                defaultValue={`${repair}, ${cost}`}
                onChange={(event: { target: { value: any } }) => {
                  console.log(event.target.value);
                  const [repair, cost] = event.target.value.split(", ");
                  console.log(cost);
                  setEditedData({
                    ...editedData,
                    repair: repair,
                    cost: parseInt(cost),
                  });
                }}
              >
                {repairs.map(({ repair, cost }) => {
                  return (
                    <option
                      key={repair}
                      value={`${repair}, ${cost}`}
                    >{`${repair}, £${cost}`}</option>
                  );
                })}
              </Select>
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button bg={"#4C80B0"} mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            fontSize={25}
            bg={"#89C6C2"}
            onClick={onConfirm}
            isDisabled={isDisabled}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
