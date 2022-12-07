import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure, useToast } from "@chakra-ui/react";
import { cloneElement, ReactElement, useState } from "react";
import { User } from "../models/User";
import { errorToast, successToast, validationErrorToast } from "../utils/toaster";

export default function ExpenseHeaderForm({ button, onAdd }: { button: ReactElement, onAdd: () => void }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [title, setTitle] = useState('');
    const [expenseAt, setExpenseAt] = useState(new Date().toISOString().split('T')[0]);
    const [expenseBy, setExpenseBy] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState<User[]>([]);

    async function openModal() {
        setTitle('');
        if (!users.length)
            await getUsers();
        onOpen();
    }

    async function getUsers() {
        setIsLoading(true);
        try {
            const response = await fetch('/api/users');
            if (response.ok)
                setUsers(await response.json());
            else
                errorToast('Failed fetching expense data');
        } catch (err) {
            errorToast('Failed fetching expense data');
        }
        setIsLoading(false);
    }

    async function handleSubmit() {
        if (title === '') {
            validationErrorToast('Please enter Title');
            return;
        }

        if (expenseBy === '') {
            validationErrorToast('Please enter Expense By');
            return;
        }

        try {
            const response = await fetch('/api/expenses/', {
                method: 'POST',
                body: JSON.stringify({
                    Title: title,
                    ExpenseAt: expenseAt,
                    ExpenseBy: expenseBy
                })
            });
            if (response.ok)
                successToast('Successfully saved Expense');
            else
                errorToast('Failed to save Expense');
            onClose();
        } catch {
            errorToast('Failed to save Expense');
        }
        onAdd();
    }

    const TheButton = cloneElement(button, { onClick: openModal, isLoading: isLoading });
    return (
        <>
            {TheButton}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Expense Header</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input value={title} onChange={(event) => {
                                setTitle(event.target.value);
                            }} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Expense At</FormLabel>
                            <Input type='date' value={expenseAt} onChange={(event) => {
                                setExpenseAt(event.target.value);
                            }} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Expense By</FormLabel>
                            <Select placeholder='Choose user' onChange={(event) => {
                                setExpenseBy(event.target.value);
                            }}>
                                {users.map(e => {
                                    return (
                                        <option value={e.Id} key={e.Id}>{e.Name}</option>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' colorScheme='teal' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme='teal' onClick={handleSubmit}>Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}