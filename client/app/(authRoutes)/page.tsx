'use client';

import { useAuthContext } from '@/context/AuthProvider/AuthProvider';

export default function Home() {
    const { user } = useAuthContext();
    return (
        <section className='flex h-full w-full flex-row gap-1 p-2'>
            hi from NextChat Home your id: {user.otherDetails.id}
        </section>
    );
}
