import { Box, Flex, Button, useColorMode, useColorModeValue, Heading } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.100", "gray.900");

  return (
    <Box bg={bg} px={4} boxShadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Heading size="md">Text Animator</Heading>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <FaMoon /> : <FaSun />}
        </Button>
      </Flex>
    </Box>
  );
};

export default NavBar;