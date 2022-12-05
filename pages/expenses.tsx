import { Card, CardBody, CardHeader, Grid, GridItem, Heading, HStack, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import { ExpenseCard } from "../components/expense-card";
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
    const [rows, setRows] = useState<ExpenseHeader[]>(expenses);
    async function getExpenseHeader() {
        const response = await fetch('/api/expenses');
        setRows(await response.json());
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
                <Grid gap='10px' templateColumns='repeat(3, 1fr)' w='full'>
                    {rows.map(e => {
                        return (
                            <GridItem key={e.Id}>
                                <ExpenseCard expense={e} />
                            </GridItem>
                        );
                    })}
                </Grid>
            </VStack>
        </>
    )
}