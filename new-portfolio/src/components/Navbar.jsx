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
    useColorMode,
    Spacer,

} from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';


function Navbar(){

    const {isOpen, onOpen, onClose} = useDisclosure();

    const { colorMode, toggleColorMode} = useColorMode();

    const navLinks = [
        { name : 'Home', path : '/' },
        { name : 'Skills', path: '/skills'},
        { name : 'Experience', path : '/experience' },
        { name : 'Projects', path: '/projects'},
        {name : 'Contact', path : '/contact'}
    ] 
    return (
        <Box bg={colorMode === 'light' ? 'white' : 'gray.800'} 
            boxShadow="sm" 
            px={{ base: 4, md: 8 }} 
            py={4}
        >
            <Flex
                alignItems="center"
                justifyContent="space-between"
                maxW="container.lg"
                mx="auto"
            >
                <Heading as={RouterLink} to="/" size="md" color="teal.600"> 
                    Shivkumar Pujari
                </Heading>
                <Spacer display={{base: 'none', md: 'block'}} />
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
                    <IconButton
                        ml={4}
                        onClick={toggleColorMode}
                        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        aria-label="Toggle color mode"
                        variant="ghost"
                    />
                    
                </Flex>
                <Flex display={{base:"flex", md:'none'}}>
                    <IconButton 
                        onClick={toggleColorMode}
                        icon={colorMode === 'light' ? <MoonIcon />:<SunIcon />}
                        aria-label="toggle color mode"
                        variant="ghost"
                    />
                    <IconButton
                        aria-label="Open Menu"
                        icon={<HamburgerIcon/>}
                        display={{base: 'bock', md:'none'}}
                        onClick={onOpen}
                    />
                </Flex>
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