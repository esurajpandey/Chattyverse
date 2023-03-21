import React, { useEffect } from "react";
import Login from "../components/authentication/Login";
import Signup from "../components/authentication/Signup";

import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";

import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user-info"));

    if (user) {
      history.push("/chats");
    }
  }, [history]);
  return (
    <Container maxWidth="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg="rgb(56,170,164)"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        border={0}
      >
        <Text fontWeight={900}>My-Chat-App</Text>
      </Box>

      <Box
        bg="#1C2C4D"
        w="100%"
        borderRadius="lg"
        borderWidth="1px"
        border={0}
        color="black"
        p="0.4em"
      >
        <Tabs variant="soft-rounded">
          <TabList mb="0.5em">
            <Tab width={"50%"} color="white">
              Login
            </Tab>
            <Tab width={"50%"} color="white">
              Sign up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
