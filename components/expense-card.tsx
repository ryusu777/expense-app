import { Button, Card, CardBody, CardHeader, Heading, HStack, IconButton, Link, ListItem, SimpleGrid, UnorderedList, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { ExpenseDetail } from "../models/ExpenseDetail";
import { ExpenseHeader  } from "../models/ExpenseHeader";
import { ViewIcon } from '@chakra-ui/icons';
import { money } from "../utils/formatter";
export function ExpenseCard({ expense }: { expense: ExpenseHeader }) {
    const [details, setDetails] = useState<ExpenseDetail[]>([]);
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function getDetails() {
        setIsLoading(true);
        const response = await fetch(`/api/expense-details?id=${expense.Id}`);
        setDetails(await response.json());
        setIsLoading(false);
    }

    async function toggleShowDetail() {
        setShowDetail(!showDetail);
        if (!showDetail)
            await getDetails();
    }

    return (
        <Card key={expense.Id} variant='filled'>
            <CardHeader>
                <Heading size='xs' color='gray.500'>{(new Date(expense.ExpenseAt)).toDateString()}</Heading>
                <Heading size='md'>{expense.Title}</Heading>
                <HStack justifyContent='space-between' mt='5px'>
                    <Heading size='sm' color='green.500'>{expense.ExpenseBy}</Heading>
                    <Heading size='sm' color='red.400'>{money(expense.ExpenseTotal)}</Heading>
                </HStack>
                <Button
                    mt='5px'
                    colorScheme='teal'
                    size='sm'
                    onClick={toggleShowDetail}
                    isLoading={isLoading}
                    loadingText='Getting data'
                >Toggle details</Button>
            </CardHeader>
            {showDetail && details.length ?
                <CardBody>
                    <VStack>
                        {details.map(e => {
                            return (
                                <HStack justifyContent='space-between' key={e.Id} w='full'>
                                    <Heading size='xs'>{e.Name}</Heading>
                                    <Heading size='xs'>{money(e.Price)}</Heading>
                                </HStack>
                            )
                        })}
                    </VStack>
                </CardBody> 
            : null}
        </Card>
    )
}