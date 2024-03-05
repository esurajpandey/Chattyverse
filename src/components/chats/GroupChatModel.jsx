import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import axios from "axios";
import UserListItem from "../user/UserListItem";
import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";
import UserBadgeItem from "../user/UserBadgeItem";
const GroupChatModel = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const endPoint = process.env.REACT_APP_SERVER_END_POINT || '';
  const toast = useToast();
  const { user, chats, setChats } = ChatState();

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
        endPoint + `/api/user/user?search=${search}`,
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
  const handlerSubmit = async () => {
    if (!groupChatName || !selectedUsers.length === 0) {
      toast({
        title: "please fill all the details",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.post(
        endPoint + "/api/chat/create-group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );

      setChats([data, ...chats]);
      onClose();

      toast({
        title: "New Group chat is created",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (err) {
      toast({
        title: "Failed to create group",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
  };

  const handleDelete = (user) => {
    setSelectedUsers(selectedUsers.filter((u) => u._id !== user?._id));
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work-sans"
            display={"flex"}
            justifyContent="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDir="column" alignItems="center">
            <FormControl>
              <Input
                value={groupChatName}
                placeholder="Group name"
                mb={3}
                name="chat_name"
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                value={search}
                placeholder="Add Users eg: John,Piyush,Jane"
                mb={1}
                name="search"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box width={"100%"} display="flex" flexWrap={"wrap"}>
              {selectedUsers?.map((user) => {
                return (
                  <UserBadgeItem
                    key={user?._id}
                    user={user}
                    handleFunction={() => handleDelete(user)}
                  />
                );
              })}
            </Box>
            {loading ? (
              <div>Loading..</div>
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user?._id}
                  user={user}
                  handleFunction={() => handleGroup(user)}
                />
              ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handlerSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModel;
