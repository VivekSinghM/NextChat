'use client';

import { ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/system';
import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { AuthProvider } from '@/context/AuthProvider/AuthProvider';
import { QueryClient, QueryClientProvider } from 'react-query';

export interface ProvidersProps {
    children: ReactNode;
    themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
    const router = useRouter();
    const queryClient = new QueryClient();

    return (
        <NextUIProvider navigate={router.push}>
            <NextThemesProvider {...themeProps}>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>{children}</AuthProvider>
                </QueryClientProvider>
            </NextThemesProvider>
        </NextUIProvider>
    );
}
