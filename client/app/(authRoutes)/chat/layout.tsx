'use client';
import { ReactNode } from 'react';

import ContactsProvider from '@/context/ContactProvider/ContactsProvider';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <ContactsProvider>{children}</ContactsProvider>
        </>
    );
}
