'use client';
// export const metadata: Metadata = {
//     title: {
//         default: siteConfig.name,
//         template: `%s - ${siteConfig.name}`,
//     },
//     description: siteConfig.description,
//     icons: {
//         icon: '/favicon.ico',
//     },
// };

import SocketProvider from '@/context/SocketProvider/SocketProvider';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <SocketProvider>{children}</SocketProvider>;
}
