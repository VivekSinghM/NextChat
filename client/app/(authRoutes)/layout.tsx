import { AuthProvider } from '@/context/AuthProvider/AuthProvider';

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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
