import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { ChatState } from "../../context/ChatProvider";
import UserBadgeItem from "../user/UserBadgeItem";
import UserListItem from "../user/UserListItem";

const UpdateChatModel = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedChat, user, setSelectedChat } = ChatState();

  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const toast = useToast();
  const handleAddUser = async (user1) => {
    if (selectedChat.users?.find((u) => u._id === user1._id)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (selectedChat.groupAdmin._id === user._id) {
      toast({
        title: "Only admin can add ",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.put(
        "/api/chat/add-to-group",
        {
          chatId: selectedChat?._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Failed to add user",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  const handleRemove = async (userToRemove) => {
    alert(JSON.stringify(userToRemove));

    if (selectedChat.groupAdmin._id === user._id) {
      toast({
        title: "Only admin can remove ",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.put(
        "/api/chat/remove-from-group",
        {
          chatId: selectedChat?._id,
          userId: userToRemove._id,
        },
        config
      );

      userToRemove._id === user._id
        ? setSelectedChat(null)
        : setSelectedChat(data);

      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      toast({
        title: "Failed to remove user",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.put(
        "/api/chat/rename-group",
        { chatId: selectedChat._id, chatName: groupChatName },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (err) {
      toast({
        title: "Failed to update chats",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setRenameLoading(false);
      setGroupChatName("");
    }
  };

  const handleSearch = async (query) => {
    setSearch(query);

    if (!query) return;

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/user/user?search=${search}`,
        config
      );
      setLoading(false);
      setSearchResult(data);
    } catch (err) {
      toast({
        title: "Failed to search",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  return (
    <>
      <IconButton display={"flex"} icon={<ViewIcon />} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"35px"}
            fontFamily="Work-sans"
            display={"flex"}
            justifyContent="center"
          >
            {selectedChat?.chatName}
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <Box w={"100%"} display="flex" flexWrap={"wrap"} pb={3}>
              {selectedChat.users.map((user) => {
                return (
                  <UserBadgeItem
                    key={user?._id}
                    user={user}
                    handleFunction={() => handleRemove(user)}
                  />
                );
              })}
            </Box>

            <FormControl display={"flex"}>
              <Input
                value={groupChatName}
                placeholder="Group name"
                mb={3}
                name="chat_name"
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme={"teal"}
                ml={1}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>

            <FormControl>
              <Input
                value={search}
                placeholder="Add Users to group"
                mb={1}
                name="search"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <Box width={"100%"} display="flex" flexWrap={"wrap"}>
                {loading ? (
                  <Spinner size="lg" />
                ) : (
                  searchResult?.map((user) => (
                    <UserListItem
                      key={user?._id}
                      user={user}
                      handleFunction={() => handleAddUser(user)}
                    />
                  ))
                )}
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={() => handleRemove(user)}>
              Leave group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateChatModel;
