import React, { useEffect, useState } from "react";
import {
    Container, 
    Heading,
    Box,
    VStack,
    Text,
    Spinner,
    useColorModeValue,
} from '@chakra-ui/react';

function Experience () {
    const [experience, setExperience] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const cardBG = useColorModeValue("white", "gray.700")
    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const response = await fetch('/api/experience');
                if (!response.ok) {
                    throw new Error("Experience data could nnot be fetched");

                }
                const data = await response.json();
                setExperience(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchExperience();
    }, []);
    if (isLoading) {
        return (
            <Container centerContent py={24}>
                <Spinner size="xl" />
                <Text mt={4}>Loading Experience ...</Text> 
            </Container>
        );
    }

    if (error) {
        return (
            <Container centerContent py={24}>
                <Text>
                    Error: {error}
                </Text>
            </Container>
        );
    }
    return (
        <Container maxW="container.lg" py={12}>
            <Heading as="h1" size="xl" mb={10} textAlign="center">My Experience</Heading>
            <VStack spacing={8} align="stretch">
                {experience.map((exp) => (
                    <Box
                        key={exp.id}
                        p={6}
                        boxShadow="md"
                        bg={cardBG}
                        _hover={{boxShadow: 'lg'}}
                        transition="box-shadow 0.2s"
                    >
                        <Heading size="md">
                            {exp.role} @ {exp.company}
                        </Heading>
                        <Text fontWeight="bold" mt={2}>
                            {exp.start_date} - {exp.end_date}
                        </Text>
                        <Text mt={4}>
                            {exp.description}
                        </Text>
                    </Box>
                ))}
            </VStack>
        </Container>
    );
}

export default Experience;