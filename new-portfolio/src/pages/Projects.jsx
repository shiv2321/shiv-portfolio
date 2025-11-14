import React, {useEffect, useState} from "react";
import { Container, Heading, SimpleGrid, Box, Spinner, Text } from "@chakra-ui/react";
import ProjectCard from "../components/projectCard";



function Projects() {
    const [projects, setProjects] = useState([]);
    const [isLoading, SetIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/projects');
                
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const data = await response.json()
                setProjects(data);
            } catch (err) {
                setError(err.message);
            } finally {
                SetIsLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if (isLoading) {
        return (
            <Container centerContent py={24}>
                <Spinner size="xl" />
                <Text mt={4}>Loading Projects...</Text> 
            </Container>
        );
    }

    if (error) {
        return (
            <Container centerContent py={24}>
                <Text color="red.500">Error: {error}</Text>
            </Container>
        );
    }

    return (
        <Container maxW="container.lg" py={12}>
            <Heading as="h1" size="2xl" mb={10} textAlign="center">
                My Projects
            </Heading>
            <SimpleGrid columns={{base: 1, md: 2}} spacing={8}>
                {projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        title={project.title}
                        description={project.description}
                        tech_stack={project.tech_stack}
                    />
                ))}
            </SimpleGrid>
        </Container>
    );
}

export default Projects;