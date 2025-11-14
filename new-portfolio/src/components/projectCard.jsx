import React from "react";
import {
    Box,
    Heading,
    Text,
    Tag,
    HStack,
    Stack,
    Card,
    CardBody
} from '@chakra-ui/react';

function ProjectCard ({title, description, tech_stack}) {
    return (
        <Card
            borderRadius='lg'
            overflow='hidden'
            boxShadow='md'
            _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
            transition='transform 0.2s, box-shadow 0.2s'
        >
            <CardBody>
                <Stack spacing="4">
                    <Heading size="md">{title}</Heading> 
                    <Text color="gray.600">{description}</Text>
                    <HStack spacing={2} wrap="wrap">
                        {tech_stack.map((tech) => (
                            <Tag key={tech} colorScheme="teal" mt={2}>
                                {tech}
                            </Tag>
                        ))}
                    </HStack>
                </Stack>
            </CardBody>
        </Card>
    );
}

export default ProjectCard;