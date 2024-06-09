import React, { useState } from 'react';
import { Container, VStack, Input, Select, Button, Text, Box, HStack, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";

const Index = () => {
  const [text, setText] = useState("");
  const [animationType, setAnimationType] = useState("typing");
  const [fontColor, setFontColor] = useState("#000000");
  const [animatedText, setAnimatedText] = useState("");

  const handleAnimate = () => {
    setAnimatedText(text);
  };

  const typingAnimation = {
    hidden: { width: 0 },
    visible: {
      width: "auto",
      transition: {
        type: "tween",
        duration: 2,
      },
    },
  };

  const pathDrawingAnimation = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl" mb={6}>Text Animator</Heading>
        <Input
          placeholder="Enter text to animate"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Select
          placeholder="Select animation type"
          value={animationType}
          onChange={(e) => setAnimationType(e.target.value)}
        >
          <option value="typing">Typing</option>
          <option value="pathDrawing">Path Drawing</option>
        </Select>
        <Input
          type="color"
          value={fontColor}
          onChange={(e) => setFontColor(e.target.value)}
        />
        <Button onClick={handleAnimate} colorScheme="teal" leftIcon={<FaRocket />}>
          Animate Text
        </Button>
        <Box mt={10} width="100%" textAlign="center">
          {animationType === "typing" && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={typingAnimation}
              style={{ overflow: "hidden", whiteSpace: "nowrap", color: fontColor, fontSize: "2xl" }}
            >
              {animatedText}
            </motion.div>
          )}
          {animationType === "pathDrawing" && (
            <svg width="100%" height="100">
              <motion.text
                x="50%"
                y="50%"
                textAnchor="middle"
                style={{ fill: fontColor, fontSize: "2xl" }}
                initial="hidden"
                animate="visible"
                variants={pathDrawingAnimation}
              >
                {animatedText}
              </motion.text>
            </svg>
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;