import { useConversationsAndContacts } from '@/context/ConversationProvider/ConversationProvider';
import { Button } from '@nextui-org/button';

import React, { useEffect, useState } from 'react';
import Model from '../UI/Model/Model';
import {
    Checkbox,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Listbox,
    ListboxItem,
    useDisclosure,
} from '@nextui-org/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuthContext } from '@/context/AuthProvider/AuthProvider';
import { useRouter } from 'next/navigation';
import { allPaths } from '@/utils/constant/paths';

const ConversationWidget = () => {
    const router = useRouter();
    const { conversation, selectedConversation } =
        useConversationsAndContacts();

    return (
        <>
            <div className='flex h-full flex-grow flex-col'>
                <div className='flex flex-row items-center justify-between p-2'>
                    <p className='text-large font-bold'>Conversations</p>
                    <OptionsMenu />
                </div>
                <hr />
                <div className='flex flex-grow overflow-y-auto p-2'>
                    {/* <ul
                        className='flex w-full flex-col gap-4'
                        style={{ maxHeight: 'calc(100vh - 170px)' }}
                    > */}

                    <Listbox
                        aria-label='Listbox Variants'
                        variant={'flat'}
                        hideSelectedIcon
                        selectionMode='single'
                        // selectedKeys={[contacts[0].id]}
                    >
                        {conversation.map((contact) => {
                            return (
                                <ListboxItem
                                    key={contact.id}
                                    className={
                                        contact.id === selectedConversation?.id
                                            ? 'cursor-default border border-gray-300 bg-[#d4d4d845]'
                                            : ''
                                    }
                                    onPress={() =>
                                        router.push(
                                            `${allPaths.chat}/${contact.id}`
                                        )
                                    }
                                >
                                    {contact.name}
                                </ListboxItem>
                            );
                        })}
                    </Listbox>
                    {/* </ul> */}
                </div>
                <AddContactModelButton />
            </div>
        </>
    );
};

export default ConversationWidget;

type formInputsFields = {
    contact_id: string;
    // alias: string;
    is_fav: boolean;
};

const AddContactModelButton = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            contact_id: '',
            // alias: '',
            is_fav: false,
        },
    });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const { handleCreateUpdateContact } = useConversationsAndContacts();
    const onSubmit: SubmitHandler<formInputsFields> = (data) => {
        setLoading(true);

        handleCreateUpdateContact({ type: 'create', data }).finally(() => {
            onClose();
            setLoading(false);
        });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => reset(), []);
    return (
        <>
            <Button
                className='m-1 rounded-none font-bold'
                color={'secondary'}
                onClick={onOpen}
            >
                Add new Contacts
            </Button>
            <Model
                isOpen={isOpen}
                onClose={onClose}
                size='md'
                header={' Modal Title'}
                body={
                    <form>
                        <Input
                            type='id'
                            variant={'bordered'}
                            label='Contact Id'
                            placeholder="Enter Contact's Id"
                            labelPlacement='outside'
                            radius='sm'
                            fullWidth
                            {...register('contact_id', {
                                required: 'User Id is required',
                                pattern: {
                                    value: /^[A-Z ß a-z]{1,4}@[0-9]{6}$/,
                                    message: 'Invalid id',
                                },
                            })}
                            isInvalid={Boolean(errors.contact_id)}
                            errorMessage={errors?.contact_id?.message}
                        />
                        <div className='flex flex-row py-2'>
                            <Checkbox {...register('is_fav')}>
                                add to Favorite
                            </Checkbox>
                        </div>
                    </form>
                }
                footer={
                    <>
                        <Button
                            color='danger'
                            variant='ghost'
                            isLoading={loading}
                            onPress={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            color='primary'
                            onPress={() => {
                                handleSubmit(onSubmit)();
                            }}
                        >
                            Add
                        </Button>
                    </>
                }
            />
        </>
    );
};

const OptionsMenu = () => {
    const { logout } = useAuthContext();
    const items = [
        {
            key: 'logout',
            label: 'logout',
            action: () => {
                logout();
            },
        },
    ];
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button variant='light' size='sm' isIconOnly>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        height='24px'
                        viewBox='0 -960 960 960'
                        width='24px'
                        fill='#e8eaed'
                    >
                        <path d='M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z' />
                    </svg>
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label='Options' items={items}>
                {(item) => (
                    <DropdownItem
                        key={item.key}
                        color={item.key === 'delete' ? 'danger' : 'default'}
                        className={item.key === 'delete' ? 'text-danger' : ''}
                        onPress={item.action}
                    >
                        {item.label}
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
};
