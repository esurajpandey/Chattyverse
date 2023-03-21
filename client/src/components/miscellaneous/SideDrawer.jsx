import React, { useState } from "react";
import axios from "axios";
import { Effect } from "react-notification-badge";
import NotificationBadge from "react-notification-badge";

import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { Text, Box } from "@chakra-ui/layout";
import { ChatState } from "../../context/ChatProvider";
import { useDisclosure } from "@chakra-ui/hooks";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import ProfileModel from "./ProfileModel";
import { useHistory } from "react-router-dom";
import ChatLoading from "../chats/ChatLoading";
import UserListItem from "../user/UserListItem";
import { getSender } from "../../utils/chatDetails";

const SideDrawer = () => {
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();
  const toast = useToast();

  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    localStorage.removeItem("user-info");
    history.push("/");
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-type": "application/json ",
        },
      };

      const { data } = await axios.post("/api/chat", { userId }, config);

      if (!chats?.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setLoadingChat(false);
      setSelectedChat(data);
      onClose();
    } catch (err) {
      toast({
        title: "Error in fetching chats",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
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

      const { data } = await axios.get(
        `/api/user/user?search=${search}`,
        config
      );

      setLoading(false);
      setSearchResult(data);
    } catch (err) {
      // console.log(err);
      toast({
        title: "Error occured",
        description: "Failed to load the search result",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        width="100%"
        padding="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text d={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize={"2xl"} fontFamily="Work-sans">
          My-Chat-App
        </Text>
        <div>
          <Menu>
            <MenuButton p="1">
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize={"2xl"} m={1} />
            </MenuButton>
            <MenuList pl={3}>
              {!notification.length && "No new messages"}
              {notification.length &&
                notification?.map((noti) => {
                  return (
                    <MenuItem
                      key={noti._id}
                      onClick={() => {
                        setSelectedChat(noti?.chat);
                        setNotification(
                          notification?.filter((n) => n !== noti)
                        );
                      }}
                    >
                      {noti.chat.isGroupChat
                        ? `New message in ${noti.chat.chatName}`
                        : `New message from ${getSender(
                            user,
                            noti?.chat?.users
                          )}`}
                    </MenuItem>
                  );
                })}
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user?.name}
                src={user?.picture}
              />
            </MenuButton>

            <MenuList>
              <ProfileModel user={user}>
                <MenuItem>My Profile</MenuItem>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </ProfileModel>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search users</DrawerHeader>

          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>

            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => {
                return (
                  <UserListItem
                    key={user?._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                );
              })
            )}

            {loadingChat && <Spinner ml="auto" display={"flex"} />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
