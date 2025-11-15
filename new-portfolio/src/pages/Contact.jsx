import React, { useState } from "react";
import { Container, 
    Heading, 
    Box,
    VStack,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription
 } from "@chakra-ui/react";

function Contact () {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        const formData = {name, email,message };
        try {
            const response = await fetch('/api/contact', {
                method:'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Something went wrong. Please try again");
            }

            const data = await response.json();

            if (data.success) {
                setSuccess('Your Message has been sent successfully!');
                setName('')
                setEmail('')
                setMessage('');
            } else {
                throw new Error(data.message || 'An unknown error occured!')
            }
            
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxW="container.md" py={12}>
            <Heading as="h1" size="2xl" mb={10} textAlign="center">
                Contact ME
            </Heading>
            <Box as="form" onSubmit={handleSubmit}>
                <VStack spacing={5}>
                    {success && (
                        <Alert status="success" borderRadius="md">
                            <AlertIcon />
                            <Box flex="1">
                                <AlertTitle>Success!</AlertTitle>
                                <AlertDescription display="block">
                                    {success}
                                </AlertDescription>
                            </Box>
                        </Alert>
                    )}
                    {error && (
                        <Alert status="error" borderRadius="md">
                            <AlertIcon />
                            <Box flex="1">
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription display="block">
                                    {error}
                                </AlertDescription>
                            </Box>
                        </Alert>
                    )}

                    <FormControl isRequired>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input
                            id="Name"
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />  
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input 
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired> 
                        <FormLabel htmlFor="Message">Message</FormLabel>
                        <Textarea 
                            id="message"
                            placeholder="Your Message..."
                            rows={6}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </FormControl>
                    <Button 
                        type="submit" 
                        colorScheme="blue" 
                        size="lg" 
                        width="full"
                        isLoading={isLoading}
                    > 
                        Send
                    </Button>
                </VStack>
            </Box>
        </Container>
    );
}

export default Contact;