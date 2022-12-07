import { AddIcon, SpinnerIcon } from "@chakra-ui/icons";
import { Box, Button, Card, CardBody, CardHeader, Grid, GridItem, Heading, HStack, IconButton, ScaleFade, SimpleGrid, SlideFade, useBreakpointValue, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import { ExpenseCard } from "../components/expense-card";
import ExpenseHeaderForm from "../components/expense-header-form";
import { ExpenseHeader, GetExpenseHeaders } from "../models/ExpenseHeader";

export async function getServerSideProps() {
    const result = await GetExpenseHeaders();
    return {
        props: {
            expenses: JSON.parse(JSON.stringify(result))
        }
    };
}

export default function Expenses({ expenses }: { expenses: ExpenseHeader[] }) {
    const columnCount = useBreakpointValue({
        lg: 3,
        md: 2,
        sm: 1,
        xs: 1
    });
    const [rows, setRows] = useState<ExpenseHeader[]>(expenses);
    const [isLoading, setIsLoading] = useState(false);
    async function getExpenseHeader() {
        setIsLoading(true);
        setRows([]);
        const response = await fetch('/api/expenses');
        setRows(await response.json());
        setIsLoading(false);
    }

    return (
        <>
            <Head>
                <title>Expenses</title>
            </Head>
            <VStack
                align='flex-start'
            >
                <Heading as="h1">Expenses</Heading>
                <HStack>
                    <ExpenseHeaderForm
                        onAdd={getExpenseHeader}
                        button={<Button leftIcon={<AddIcon />} colorScheme='teal'>New</Button>} />
                    <IconButton
                        aria-label='Reload'
                        colorScheme='teal'
                        icon={<SpinnerIcon />}
                        onClick={getExpenseHeader}
                        isLoading={isLoading}
                    />
                </HStack>
                <Box style={{ columnCount: columnCount }} columnGap='10px' w='full'>
                    {rows.map((e, i, arr) => {
                        return (
                            <Box
                                key={e.Id}
                                display='inline-block'
                                my='5px'
                                w='full'
                            >
                                <SlideFade offsetY='-15px' in={true} delay={i * 0.05}>
                                    <ExpenseCard expense={e} onDelete={async (id) => {
                                        await getExpenseHeader();
                                    }} />
                                </SlideFade>
                            </Box>
                        );
                    })}
                </Box>
            </VStack>
        </>
    )
}