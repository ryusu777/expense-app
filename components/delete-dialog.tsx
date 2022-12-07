import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react"
import { ReactElement, RefObject, useRef } from "react"

export function DeleteDialog({
    title,
    description,
    isOpen,
    onClose,
    onDelete }
    : {
        title: string,
        description: string,
        isOpen: boolean,
        onClose: () => void,
        onDelete: () => void
    }) {
    const cancelRef = useRef() as RefObject<HTMLButtonElement>;

    return (
        <>
        <AlertDialog
            isOpen={isOpen}
            onClose={onClose}
            leastDestructiveRef={cancelRef}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        {title}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {description}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={() => {
                            onClose();
                            onDelete();
                        }} ml={3}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
        </>
    )
}