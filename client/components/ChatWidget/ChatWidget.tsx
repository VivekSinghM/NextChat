import { chatType, useChats } from '@/context/ChatProvider/ChatProvider';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Avatar } from '@nextui-org/react';
import React, { useRef } from 'react';

const ChatWidget = () => {
    const { chats, sendMessage } = useChats();
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <div className='flex h-full flex-grow flex-col gap-2 '>
            <div className='bg-gray-200 p-2'>
                <p className='text-large font-bold'>ChatWindow</p>
            </div>
            <div className='flex flex-grow overflow-y-auto p-2'>
                <ul
                    className='flex w-full flex-col gap-4'
                    style={{ maxHeight: 'calc(100vh - 170px)' }}
                >
                    {chats.map((chat, index) => {
                        return (
                            <ChatCard
                                key={chat.id}
                                chat={chat}
                                isUser={index % 2 === 0}
                            />
                        );
                    })}
                </ul>
            </div>
            <div className='flex flex-row gap-2 p-2'>
                <div
                    style={{
                        width: 'calc(100% - 60px)',
                    }}
                >
                    <Input variant='bordered' ref={inputRef} />
                </div>
                <Button
                    onClick={() =>
                        inputRef.current?.value?.trim().length &&
                        sendMessage({
                            message: inputRef.current.value,
                        })
                    }
                >
                    send
                </Button>
            </div>
        </div>
    );
};

export default ChatWidget;

const ChatCard = ({ chat, isUser }: { chat: chatType; isUser: boolean }) => {
    return (
        <li
            className={`w-100 flex ${isUser ? 'flex-row-reverse' : 'flex-row '}`}
        >
            <div className='max-w-[60%]'>
                <div
                    className={`flex flex-row gap-2 ${isUser ? 'flex-row-reverse' : ''}`}
                >
                    <Avatar name={chat.sender} size='sm' />
                    <div className='w-fit rounded border border-gray-100 p-1'>
                        <p className='text-sm font-bold'>
                            {chat.content.message}
                        </p>
                    </div>
                </div>
            </div>
        </li>
    );
};
