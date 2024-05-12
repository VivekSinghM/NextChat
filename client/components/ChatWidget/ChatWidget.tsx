import { useAuthContext } from '@/context/AuthProvider/AuthProvider';
import { useConversationsAndContacts } from '@/context/ConversationProvider/ConversationProvider';
import useChat from '@/hooks/chat.hook';

import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Avatar } from '@nextui-org/react';
import React, { useRef } from 'react';

const ChatWidget = () => {
    const { user } = useAuthContext();
    const { selectedConversation } = useConversationsAndContacts();
    const { chatDetails, isFetched, handleSendMessage } = useChat(
        selectedConversation?.id
    );
    const chatMessages = chatDetails?.chat_messages || [];
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className='flex h-full flex-grow flex-col'>
            <div className='bg-gray-200 p-2'>
                <p className='text-large font-bold'>
                    {selectedConversation?.name || 'No Chat'}
                </p>
            </div>
            <div className='flex flex-grow overflow-y-auto p-2'>
                <ul
                    className='flex w-full flex-col gap-4'
                    style={{ maxHeight: 'calc(100vh - 170px)' }}
                >
                    {isFetched ? (
                        chatMessages.map((Message, index) => {
                            return (
                                <MessageCard
                                    key={Message.id}
                                    message={Message}
                                    isUser={
                                        Message.sender === user.otherDetails.id
                                    }
                                />
                            );
                        })
                    ) : (
                        <p>Loading...</p>
                    )}
                </ul>
            </div>
            <div className='flex flex-row gap-2 p-2'>
                <div
                    style={{
                        width: 'calc(100% - 60px)',
                    }}
                >
                    <Input variant='faded' ref={inputRef} />
                </div>
                <Button
                    className='font-bold'
                    color='primary'
                    onClick={() => {
                        if (inputRef.current?.value?.trim().length) {
                            handleSendMessage(inputRef.current.value);
                            inputRef.current.value = '';
                        }
                    }}
                >
                    Send
                </Button>
            </div>
        </div>
    );
};

export default ChatWidget;

const MessageCard = ({
    message,
    isUser,
}: {
    message: ReturnType<typeof useChat>['chatDetails']['chat_messages'][number];
    isUser: boolean;
}) => {
    return (
        <li
            className={`w-100 flex ${isUser ? 'flex-row-reverse' : 'flex-row '}`}
        >
            <div className='max-w-[60%]'>
                <div
                    className={`flex flex-row gap-2 ${isUser ? 'flex-row-reverse' : ''}`}
                >
                    <Avatar name={message.sender} size='sm' />
                    <div className='w-fit rounded border border-gray-100 p-1'>
                        <p className='text-sm font-bold'>
                            {/* @ts-ignore */}
                            {message.content.text}
                        </p>
                    </div>
                </div>
            </div>
        </li>
    );
};
