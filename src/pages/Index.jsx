import React, { useState, useRef, useEffect } from 'react';
import { Container, VStack, Input, Select, Button, Box, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";

const Index = () => {
  const [text, setText] = useState("");
  const [animationType, setAnimationType] = useState("typing");
  const [fontColor, setFontColor] = useState("#000000");
  const [animatedText, setAnimatedText] = useState("");
  const canvasRef = useRef(null);

  const handleAnimate = () => {
    setAnimatedText(text);
    if (animationType === "canvas") {
      drawCanvasAnimation();
    }
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

  const drawCanvasAnimation = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let x = 0;
    let fontSize = 30;
    let growing = true;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = fontColor;
      ctx.fillText(animatedText.slice(0, x), 50, 50);

      if (growing) {
        fontSize += 0.5;
        if (fontSize > 50) growing = false;
      } else {
        fontSize -= 0.5;
        if (fontSize < 30) growing = true;
      }

      x++;
      if (x > animatedText.length) {
        x = 0;
      }

      requestAnimationFrame(draw);
    };

    draw();
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
          <option value="canvas">Canvas</option>
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
          {animationType === "canvas" && (
            <canvas ref={canvasRef} width="500" height="100"></canvas>
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;