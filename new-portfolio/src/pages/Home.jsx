import React, { useEffect, useState } from "react";
import {
    Box,
    Container,
    Heading,
    Text,
    Button,
    VStack,
    HStack,
    Tag,
} from '@chakra-ui/react';
import { Link as RouterLink } from "react-router-dom";

function Home() {
    const [downloadCount, setDownloadCount] = useState(0);

    useEffect(()=> {
        const fetchCount = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/counter');
                const data = await response.json();
                setDownloadCount(data.count);
            } catch (err) {
                console.error('Failed to fetch download count:', err);
            }
        };
        fetchCount();
    }, []);

    const handleDownload = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/increase_count', {
                method:'POST'
            });
            const data = await response.json();
            setDownloadCount(data.count);
        } catch (err) {
            console.error('Failed to Increase Count: ',err);
        }
    };

    return (
        <Container maxW="container.lg" py={12}>
            <VStack
                as="header"
                textAlign="center"
                p={{ base: 6, md: 12 }}
                bg={"gray.100"}
                borderRadius="lg"
                spacing={6}
            >
                <Heading as="h1" size={{ base: '2xl', md: '3xl' }}>
                    Hello, I am Shivkumar
                </Heading>
                <Text fontSize={{ base: 'lg', md: '2xl' }} color="gray.600">
                    Aspiring Software Developer
                </Text>
                <Button
                    as="a"
                    href={"http://127.0.0.1:8000/api/download_resume"}
                    target="_blank"
                    colorScheme="teal"
                    size="lg"
                    onClick={handleDownload}
                >
                    Download Resume
                </Button>
                <Tag colorScheme="green">Resume Downloads: {downloadCount}</Tag>
            </VStack>

            <Box as="section" my={12}>
                <Heading as="h2" size="2xl" mb={6} textAlign="center">
                    Welcome!
                </Heading>
                <Text fontSize="lg" mb={4}>
                    I'm a Python developer passionate about backend systems, APIs, and web
                    applications. Hands-on with firewalls, networking (Linux, CentOS,
                    SNMP, syslog), and IDS/IPS integration (Snort). Experienced with
                    FastAPI, Django, SQL, authentication, and REST APIs.
                </Text>
                <Text fontSize="lg">
                    Currently sharpening my skills in <strong>JavaScript</strong>,
                    <strong>System Design</strong>, and <strong>Frontend Development</strong> to build full end-to-end applications.
                </Text>
            </Box>
            <HStack as="section" justify="center" spacing={8}>
                <Button as={RouterLink} to="/projects" colorScheme="blue" size="lg">
                    View My Work
                </Button>
                <Button
                    as={RouterLink}
                    to="/contact"
                    variant="outline"
                    colorScheme="blue"
                    size="lg"
                >
                    Contact ME
                </Button>
            </HStack>
        </Container>
    );
}

export default Home;