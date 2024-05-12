import React, { ReactNode } from 'react';
import {
    Modal as Next_Model,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalProps,
} from '@nextui-org/react';

const Model = ({
    size = 'md',
    header,
    body,
    footer,
    isOpen,
    onClose,
}: {
    size: ModalProps['size'];
    header: ReactNode;
    body: ReactNode;
    footer: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}) => {
    return (
        <Next_Model
            size='md'
            isOpen={isOpen}
            onClose={onClose}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
        >
            <ModalContent>
                <ModalHeader className='flex flex-col gap-1'>
                    {header}
                </ModalHeader>
                <ModalBody>{body}</ModalBody>
                <ModalFooter>{footer}</ModalFooter>
            </ModalContent>
        </Next_Model>
    );
};

export default Model;
