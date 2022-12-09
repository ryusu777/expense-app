import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, useBreakpointValue, Hide, Show, useMediaQuery, HStack, IconButton } from "@chakra-ui/react";
import { ScriptProps } from "next/script";
import Header from "./header";
import Sidebar from "./sidebar";
import { SideDrawer } from "./sidedrawer";

export default function MainLayout({ children }: ScriptProps) {
    const paddingLeft = useBreakpointValue({
        xl: '250px',
        lg: '250px',
        md: '20px',
        sm: '20px',
        xs: '20px',
        base: '20px'
    });
    const [isSmall] = useMediaQuery('(max-width: 728px)');
    return (
        <Box
            h="100vh"
            background='#1a202c'
            color='#edf2f7'
        >
            <HStack
                py='20px'
                px='20px'
                h='65px'
                w='100%'
                position='fixed'
                top='0'
                background='#1a202c'
                zIndex={2}
                justifyContent='space-between'
            >
                <Header />
                {isSmall ? (
                    <SideDrawer
                        button={<IconButton aria-label='menu' icon={<HamburgerIcon />} variant='solid' colorScheme='teal' />}
                    />
                ) : null}
            </HStack>
            <HStack alignItems='flex-start'>
                {!isSmall ? (
                    <Box
                        pt='85px'
                        px='20px'
                        h='full'
                        minWidth='250px'
                    >
                        <Sidebar />
                    </Box>
                ) : null}
               <Box
                    pt='65px'
                    pr='20px'
                    pl='20px'
                    h='full'
                >
                    {children}
                </Box>
            </HStack>
        </Box>
    );
}
