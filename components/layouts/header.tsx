import { Box, Flex, Heading } from '@chakra-ui/react';

export default function Header() {
  return (
    <header>
      <Flex justifyContent={"space-between"}>
        <Heading size="md">Expenses</Heading>
      </Flex>
    </header>
  );
}
