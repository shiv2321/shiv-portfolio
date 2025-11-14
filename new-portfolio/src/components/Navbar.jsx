import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, 
    Flex, 
    Button, 
    Heading,
    IconButton,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    VStack,
    useDisclosure,

} from "@chakra-ui/react";
import { HamburgerIcon } from '@chakra-ui/icons';


function Navbar(){

    const {isOpen, onOpen, onClose} = useDisclosure();
    const navLinks = [
        { name : 'Home', path : '/' },
        { name : 'Skills', path: '/skills'},
        { name : 'Experience', path : '/experience' },
        { name : 'Projects', path: '/projects'},
        {name : 'Contact', path : '/contact'}
    ] 
    return (
        <Box bg="white" boxShadow="sm" px={{ base: 4, md: 8 }} py={4}>
            <Flex
                alignItems="center"
                justifyContent="space-between"
                maxW="container.lg"
                mx="auto"
            >
                <Heading as={RouterLink} to="/" size="md" color="teal.600"> 
                    Shivkumar Pujari
                </Heading>
                <Flex display={{base:'none', md:'flex' }} gap={4}>
                    {navLinks.map((link) => (
                        <Button
                            key={link.name}
                            as={RouterLink}
                            to={link.path}
                            variant="ghost"
                            colorScheme="gray"
                        >
                            {link.name}
                        </Button>
                    ))}
                </Flex>

                <IconButton
                    aria-label="Open Menu"
                    icon={<HamburgerIcon/>}
                    display={{base: 'bock', md:'none'}}
                    onClick={onOpen}
                />
            </Flex>
            <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Navigation</DrawerHeader>
                    <DrawerBody>
                        <VStack as="nav" spacing={4}>
                            {navLinks.map((link) => (
                                <Button
                                    key={link.name}
                                    as={RouterLink}
                                    to={link.path}
                                    variant="ghost"
                                    colorScheme="gray"
                                    w="100%"
                                    onClick={onClose}                                    
                                >
                                    {link.name}
                                </Button>
                            ))}
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
}

export default Navbar;