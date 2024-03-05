import React from "react";
import { ChatState } from "../../context/ChatProvider";

import { Box } from "@chakra-ui/react";
import SingleChat from "./SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems={"flex-start"}
      flexDir="column"
      justifyContent="center"
      p={3}
      bg="grey"
      w={{ base: "100%", md: "68%" }}
      borderRadius={"1g"}
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
