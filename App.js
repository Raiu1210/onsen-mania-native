import React from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  Button,
  Heading,
  Input,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  FormControl
} from "native-base";
import NativeBaseIcon from "./components/NativeBaseIcon";
import { Platform } from "react-native";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

export default function App() {
  return (
    <NativeBaseProvider>
      <Center w="100%" h="100%">
        <Box safeArea p="2" w="90%" maxW="290" py="8">
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>username</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input type="password" />
            </FormControl>
            
            <Button mt="10" colorScheme="indigo">
              Login
            </Button>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}

