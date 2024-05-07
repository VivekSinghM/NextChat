'use client';
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';

import { supabase } from '@/utils/supabase/client';
import { AuthChangeEvent } from '@supabase/supabase-js';

import { DatabaseTable } from '@/types/customSchema';
import { allPaths } from '@/utils/constant/paths';

type AuthContextType = {
    user: {
        otherDetails: Omit<DatabaseTable['users'], 'public_id' | 'created_at'>;
        email: string;
        id: string;
    } | null;
    handleUserUpdate: (
        x: Omit<DatabaseTable['users'], 'public_id'> | null
    ) => Promise<Boolean>;
    // eslint-disable-next-line no-unused-vars
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthContextType['user']>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathName = usePathname();

    const setUserDetails = async ({
        id,
        email,
    }: {
        id: string;
        email: string;
    }) => {
        if (id !== user?.id) {
            const userDetails = await getUserDetails(id);
            setUser({ otherDetails: userDetails || null, id, email });
            loading && setLoading(false);
        }
    };

    const handleUserUpdate: AuthContextType['handleUserUpdate'] = async (
        data
    ) => {
        return false;
    };

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange(
            (event: AuthChangeEvent, session) => {
                const { id, email } = session?.user || {};
                if (event !== 'TOKEN_REFRESHED') {
                    if (id && email) {
                        !user && setUserDetails({ id, email });
                    } else if (event !== 'USER_UPDATED') {
                        setUser(null);
                        loading && setLoading(false);
                        // router.replace(allPaths.login);
                    }
                }
            }
        );
        return () => {
            listener.subscription.unsubscribe();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        //   @ts-ignore
        if (!loading) {
            if (user?.email) {
                console.log('hi');

                if (!user?.otherDetails) {
                    console.log(allPaths.onboarding);
                    router.replace(allPaths.onboarding);
                }
                [allPaths.login, allPaths.register].includes(pathName) &&
                    router.replace(allPaths.dashboard);
            } else {
                console.log(
                    user?.email,
                    pathName,
                    [allPaths.login, allPaths.register].includes(pathName),
                    user
                );
                ![allPaths.login, allPaths.register].includes(pathName) &&
                    router.replace(allPaths.login);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, pathName, loading]);

    return (
        <>
            {loading ? (
                'loading'
            ) : (
                <AuthContext.Provider value={{ user, handleUserUpdate }}>
                    {children}
                </AuthContext.Provider>
            )}
        </>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a AuthProvider');
    }
    return context;
};

const getUserDetails = (id: string) => {
    try {
        return supabase
            .from('users')
            .select('id:public_id, first_name, last_name, image, about')
            .eq('id', id)
            .single()
            .then(({ data, error }) => {
                if (error) {
                    console.error(error.message);
                    throw new Error(error.message);
                }
                return data || null;
            });
    } catch (e) {
        console.error(e);
        return null;
    }
};
