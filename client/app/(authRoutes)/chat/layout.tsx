'use client';
import { ReactNode } from 'react';

import ConversationProvider from '@/context/ConversationProvider/ConversationProvider';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <ConversationProvider>{children}</ConversationProvider>
        </>
    );
}
