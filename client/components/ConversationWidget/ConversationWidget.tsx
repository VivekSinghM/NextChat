import {
    contactType,
    useContacts,
} from '@/context/ContactProvider/ContactsProvider';
import React from 'react';

const ConversationWidget = () => {
    const { contacts } = useContacts();
    return (
        <div className='gap-2 p-4'>
            <p className='text-large font-bold'>Conversations</p>
            <ul>
                {contacts.map((contact) => {
                    return (
                        <ConversationsCard
                            key={contact.id}
                            contact={contact}
                            selected={true}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

export default ConversationWidget;

const ConversationsCard = ({
    contact,
    selected,
}: {
    contact: contactType;
    selected: boolean;
}) => {
    return (
        <li
            className={`border border-gray-300 p-2 ${selected ? 'border-gray-400 bg-gray-400 text-white' : ' cursor-pointer hover:bg-gray-100 active:bg-gray-200'}`}
        >
            <p className='text-sm font-bold'>{contact.name}</p>
            {contact.lastMessage && (
                <p className='text-sm'>{contact.lastMessage}</p>
            )}
        </li>
    );
};
