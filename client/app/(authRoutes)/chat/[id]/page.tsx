'use client';

import ChatWidget from '@/components/ChatWidget/ChatWidget';
import ConversationWidget from '@/components/ConversationWidget/ConversationWidget';

export default function ChatPage() {
    return (
        <section className='flex h-full w-full flex-row gap-1 p-2'>
            <div className='w-1/4 border-spacing-0 border'>
                <ConversationWidget />
            </div>
            <div className='w-3/4 border-spacing-0 border'>
                <ChatWidget />
            </div>
        </section>
    );
}
