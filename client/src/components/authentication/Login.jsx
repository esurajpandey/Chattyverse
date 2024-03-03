import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";

const Login = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = (e) => setShow(!show);
  const toast = useToast();
  const history = useHistory();

  const endPoint = process.env.REACT_APP_SERVER_END_POINT || '';

  const loginHandler = async () => {
    setLoading(true);
    if (!password || !email) {
      toast({
        title: "Please fill the required fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        endPoint + "/api/user/login",
        {
          email,
          password,
        },
        config
      );

      console.log("User", data);
      toast({
        title: "Login successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("user-info", JSON.stringify(data));
      setLoading(false);

      history.push("/chats");
    } catch (err) {
      const message = err?.response?.data?.message || "Login faild - User not found / incorrect details"
      toast({
        title: "Error occured",
        description: message,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  return (
    <VStack spacing="5px" color={"white"}>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleShow}
              backgroundColor="rgb(56,170,164)"
            >
              {show ? "hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={loginHandler}
      >
        Login
      </Button>

      <Button
        variant="solid"
        colorScheme="cyan"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
        isLoading={loading}
      >
        Get Guest user Credentials
      </Button>
    </VStack>
  );
};

export default Login;
