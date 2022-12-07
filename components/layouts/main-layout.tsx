import { Grid, GridItem, Container, Center, Box, Show, useBreakpoint, useBreakpointValue, Hide } from "@chakra-ui/react";
import { ScriptProps } from "next/script";
import Header from "./header";
import Sidebar from "./sidebar";

export default function MainLayout({ children }: ScriptProps) {
    const paddingLeft = useBreakpointValue({
        xl: '250px',
        lg: '250px',
        md: '20px',
        sm: '20px',
        xs: '20px'
    });
    return (
        <Box
            h="100vh"
            background='#1a202c'
            color='#edf2f7'
        >
            <Box py='20px' px='20px' h='65px' w='100%' position= 'fixed' top= '0' background='#1a202c' zIndex={2}>
                <Header />
            </Box>
            <Hide below="lg">
                <Box py='20px' px='20px' h='100%' w='250px' position='fixed' top='65px' left='0' >
                    <Sidebar />
                </Box>
            </Hide>
            <Box
                pt='65px'
                pl={paddingLeft}
                pr='20px'
            >
                {children}
            </Box>
        </Box>
    )
}
