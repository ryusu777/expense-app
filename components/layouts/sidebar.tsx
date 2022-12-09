import { Box, Button, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar({ onNavigate } : { onNavigate?: () => any }) {
    const router = useRouter();
    const menuList = [
        {
            icon: 'home',
            label: 'Home',
            navigation: '/'
        },
        {
            icon: 'expenses',
            label: 'Expenses',
            navigation: '/expenses'
        }
    ];
    return (
        <VStack 
            h='full'
            alignItems='flex-start'
            justifyContent='flex-start'
        >
            {menuList.map(e => {
                return (
                    <Link
                        key={e.navigation}
                        href={e.navigation}
                        onClick={onNavigate}
                        style={{ width: '100%' }}
                    >
                        <Button
                            w='full'
                            colorScheme='teal'
                            variant={router.pathname == e.navigation ? 'solid' : 'flat'}
                            size='sm'
                        >
                            <Box w='full' textAlign='left'>
                                {e.label}
                            </Box>
                        </Button>
                    </Link>
                );
            })}
        </VStack>
    )
}
