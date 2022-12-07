import { createStandaloneToast, useToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();
export function validationErrorToast(description: string) {
    toast({
        position: 'top-right',
        title: 'Validation error',
        description,
        status: 'error',
        duration: 5000,
        isClosable: true
    });
}

export function successToast(description: string) {
    toast({
        position: 'top-right',
        title: 'Success',
        description,
        status: 'success',
        duration: 5000,
        isClosable: true
    });
}

export function errorToast(description: string) {
    toast({
        position: 'top-right',
        title: 'Error',
        description,
        status: 'error',
        duration: 5000,
        isClosable: true
    });
}