import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure } from "@chakra-ui/react"
import { cloneElement, ReactElement } from "react"
import Sidebar from "./sidebar"

export function SideDrawer({ button }: { button: ReactElement }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const TheButton = cloneElement(button, { onClick: onOpen });
    return (
        <>
            {TheButton}
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>

                    <DrawerBody>
                        <Sidebar
                            onNavigate={onClose}
                        />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}