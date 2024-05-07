'use client';

import ChatWidget from '@/components/ChatWidget/ChatWidget';
import ConversationWidget from '@/components/ConversationWidget/ConversationWidget';
import ChatsProvider from '@/context/ChatProvider/ChatProvider';

import ContactsProvider from '@/context/ContactProvider/ContactsProvider';
import { io } from 'socket.io-client';

export default function Home() {
    console.log('res');
    const socket = io('http://localhost:8080/test');
    socket.on('connect', () => {
        console.log('connected with', socket.id);
        socket.emit('new_connect');
    });

    socket.on('ping', (res) => {
        console.log(res);
    });

    socket.on('response', (res) => {
        console.log(res);
    });

    socket.on('disconnect', () => {
        console.error('Ops, something went wrong');
    });
    return (
        <ContactsProvider>
            <ChatsProvider>
                <section className='flex h-full w-full flex-row gap-1 p-2'>
                    <div className='w-1/4 border-spacing-0 border'>
                        <ConversationWidget />
                    </div>
                    <div className='w-3/4 border-spacing-0 border'>
                        <ChatWidget />
                    </div>
                </section>
            </ChatsProvider>
        </ContactsProvider>
    );
}
