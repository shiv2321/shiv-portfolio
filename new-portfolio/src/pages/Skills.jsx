import React, {useState, useEffect} from "react";
import {
    Container,
    Heading, 
    Text,
    Box,
    SimpleGrid,
    Tag,
    Spinner,
    HStack,
    useColorModeValue,
} from "@chakra-ui/react";

function Skills () {

    const [skillCategories, setSkillCategories] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const cardBG = useColorModeValue("white", "gray.700")

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await fetch("/api/skills");


                if (!response.ok) {
                    throw new Error('Skill data could not be fetched!');
                }
                const data = await response.json();
                console.log(data)
                setSkillCategories(data);

            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSkills(); 
    }, []);

    if (isLoading) {
        return (
            <Container centerContent py={24}>
                <Spinner size="xl" />
                <Text mt={4}>Loading Skills...</Text> 
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
        )
    }
    return (
        <Container maxW="container.lg" py={12}>
            <Heading as="h1" size="2xl" mb={10} textAlign="center">My Skills</Heading>
            <SimpleGrid columns={{base:1, md:2}} spacing={8}>
                {Object.keys(skillCategories).map((categoryName) => (

                    <Box
                        key={categoryName}
                        p={6}
                        boxShadow="md"
                        borderRadius="lg"
                        bg={{cardBG}}
                    >
                        <Heading size="lg" mb={4}>
                            {categoryName}
                        </Heading>

                        <HStack spacing={2} wrap="wrap">
                            {skillCategories[categoryName].map((skill) => (
                                <Tag key={skill} size="lg" colorScheme="blue" m={1}>
                                    {skill}
                                </Tag>
                            ))}
                        </HStack>
                    </Box>
                ))}
            </SimpleGrid>
        </Container>
    );
}

export default Skills;