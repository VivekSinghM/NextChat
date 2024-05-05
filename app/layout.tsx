import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import { siteConfig } from '@/config/site';
import { fontSans } from '@/config/fonts';
import { Providers } from './providers';
import { Navbar } from '@/components/navbar';
import { Link } from '@nextui-org/link';
import clsx from 'clsx';

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: '/favicon.ico',
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en' suppressHydrationWarning>
            <head />
            <body
                className={clsx(
                    'min-h-screen bg-background font-sans antialiased',
                    fontSans.variable
                )}
            >
                <Providers
                    themeProps={{ attribute: 'class', defaultTheme: 'dark' }}
                >
                    <div className='relative flex h-screen flex-col'>
                        {/* <Navbar /> */}
                        <main className='container mx-auto max-w-7xl flex-grow px-3 pt-8'>
                            {children}
                        </main>
                        <footer className='flex w-full items-center justify-center py-3'>
                            <Link
                                isExternal
                                className='flex items-center gap-1 text-current'
                                href='https://nextui-docs-v2.vercel.app?utm_source=next-app-template'
                                title='nextui.org homepage'
                            >
                                <span className='text-default-600'>
                                    Powered by
                                </span>
                                <p className='text-primary'>Vß</p>
                            </Link>
                        </footer>
                    </div>
                </Providers>
            </body>
        </html>
    );
}