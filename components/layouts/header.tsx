import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, IconButton, Show } from '@chakra-ui/react';
import { SideDrawer } from './sidedrawer';

export default function Header() {
  return (
    <header>
      <Flex justifyContent={"space-between"}>
        <Show below='md'>
          <SideDrawer button={<IconButton colorScheme='teal' variant='ghost' aria-label='menu' icon={<HamburgerIcon />} />} />
        </Show>
        <Heading size="md">Expenses</Heading>
      </Flex>
    </header>
  );
}
