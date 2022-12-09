import { DeleteIcon, SmallAddIcon } from "@chakra-ui/icons";
import { Badge, Button, Card, CardBody, CardHeader, Collapse, FormControl, FormLabel, Heading, HStack, IconButton, Input, Link, ListItem, SimpleGrid, UnorderedList, useDisclosure, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { ExpenseDetail } from "../models/ExpenseDetail";
import { ExpenseHeader  } from "../models/ExpenseHeader";
import { money } from "../utils/formatter";
import { errorToast, successToast, validationErrorToast } from "../utils/toaster";
import { DeleteDialog } from "./delete-dialog";
export function ExpenseCard({ expense, onDelete }: { expense: ExpenseHeader, onDelete: (expenseId: number | string) => any }) {
    const [details, setDetails] = useState<ExpenseDetail[]>([]);
    const [showDetail, setShowDetail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();

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

    async function handleSubmitDetail() {
        if (name === '') {
            validationErrorToast('Please enter detail\'s name');
            return;
        }

        if (price === '') {
            validationErrorToast('Please enter detail\'s price');
            return;
        }

        setIsSubmitLoading(true);
        try {
            const response = await fetch(`/api/expense-details`, {
                method: 'POST',
                body: JSON.stringify({
                    Name: name,
                    Price: price,
                    ExpenseHeaderId: expense.Id
                })
            })

            if (response.ok) {
                getDetails();
                successToast('Successfully added detail');
                setName('');
                setPrice('');
                expense.ExpenseTotal = (Number(expense.ExpenseTotal) + Number(price));
            } else {
                errorToast('Failed to add detail');
            }
        } catch {
            errorToast('Failed to add detail');
        }
        setIsSubmitLoading(false);
    }

    async function handleDelete(id: number) {
        setIsDeleteLoading(true);
        try {
            const response = await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
            if (response.ok) {
                successToast('Successfully deleted expense');
                onDelete(id);
            }
            else
                errorToast('Failed to delete expense');
        } catch {
            errorToast('Failed to delete expense');
        }
        setIsDeleteLoading(false);
    }

    return (
        <>
            <DeleteDialog
                description="Are you sure want to delete?"
                title="Delete expense"
                isOpen={isOpen}
                onClose={onClose}
                onDelete={() => { 
                    handleDelete(expense.Id);
                }}
            />
            <Card key={expense.Id} variant='filled'>
                <CardHeader>
                    <HStack justifyContent='space-between'>
                        <Heading size='xs' color='gray.500'>{(new Date(expense.ExpenseAt)).toDateString()}</Heading>
                        <IconButton
                            aria-label='Delete'
                            icon={<DeleteIcon />}
                            size='xs'
                            variant='solid'
                            colorScheme='red'
                            isLoading={isDeleteLoading}
                            onClick={onOpen}
                        />
                    </HStack>
                    <HStack justifyContent='space-between' mt='5px'>
                        <HStack alignItems='center'>
                            <Heading size='md'>{expense.Title}</Heading>
                            <Badge size='sm' colorScheme='teal' variant='outline'>{expense.ExpenseBy}</Badge>
                        </HStack>
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
                <Collapse animateOpacity={false} in={!!showDetail && !!details.length}>
                    <CardBody pt='0'>
                        <VStack>
                            <form style={{ width: '100%' }} onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmitDetail();
                            }}>
                                <HStack justifyContent='space-between' w='full'>
                                    <HStack>
                                        <Input
                                            placeholder='Name'
                                            size='sm'
                                            variant='flushed'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <Input
                                            placeholder='Price'
                                            size='sm'
                                            variant='flushed'
                                            type='number'
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </HStack>
                                    <IconButton
                                        aria-label='Save'
                                        icon={<SmallAddIcon />}
                                        size='sm'
                                        variant='solid'
                                        colorScheme='teal'
                                        isLoading={isSubmitLoading}
                                        type='submit'
                                    />
                                </HStack>
                            </form>
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
                </Collapse>
            </Card>
        </>
    )
}