'use client';
import {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';
import { AuthChangeEvent } from '@supabase/supabase-js';

import {
    DatabaseTable,
    DatabaseTableInsert,
    DatabaseTableUpdate,
} from '@/types/customSchema';
import { allPaths } from '@/utils/constant/paths';

type AuthContextType = {
    user: {
        otherDetails: Omit<DatabaseTable['users'], 'public_id' | 'created_at'>;
        email: string;
        id: string;
    } | null;
    logout: () => void;
    handleUserUpdate: (
        x:
            | {
                  data: Omit<DatabaseTableInsert['users'], 'id' | 'public_id'>;
                  op: 'create';
              }
            | {
                  data: Omit<DatabaseTableUpdate['users'], 'id'>;
                  op: 'update';
              }
    ) => Promise<Boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthContextType['user']>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathName = usePathname();

    const setUserDetails = useCallback(
        async ({ id, email }: { id: string; email: string }) => {
            if (id !== user?.id) {
                const userDetails = await getUserDetails(id);
                setUser({ otherDetails: userDetails || null, id, email });
                stopLoading();
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [user?.id]
    );

    const stopLoading = () => {
        loading && setTimeout(() => setLoading(false), 200);
    };

    const logout = useCallback(() => {
        setLoading(true);
        supabase.auth.signOut().then(({ error }) => {
            if (!error) router.replace(allPaths.login);
            stopLoading();
        });
    }, []);

    const handleUserUpdate: AuthContextType['handleUserUpdate'] = useCallback(
        async ({ data, op }) => {
            return (
                op === 'update'
                    ? createUpdateUser({
                          data: {
                              ...data,
                              ...(op === 'update'
                                  ? { public_id: user.otherDetails.id }
                                  : {}),
                          },
                          op,
                      })
                    : createUpdateUser({
                          data,
                          op,
                      })
            ).then((data) => {
                setUser((pre) => ({ ...pre, otherDetails: data }));
                return true;
            });
        },
        [user?.otherDetails?.id]
    );

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange(
            (event: AuthChangeEvent, session) => {
                const { id, email } = session?.user || {};
                if (event !== 'TOKEN_REFRESHED') {
                    if (id && email) {
                        !user && setUserDetails({ id, email });
                    } else if (event !== 'USER_UPDATED') {
                        setUser(null);
                        stopLoading();
                    }
                }
            }
        );
        return () => {
            listener.subscription.unsubscribe();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id]);

    useEffect(() => {
        //   @ts-ignore
        if (!loading) {
            if (user?.email) {
                if (!user?.otherDetails) {
                    router.replace(allPaths.onboarding);
                } else {
                    [
                        allPaths.login,
                        allPaths.register,
                        allPaths.onboarding,
                    ].includes(pathName) && router.replace(allPaths.dashboard);
                }
            } else {
                ![allPaths.login, allPaths.register].includes(pathName) &&
                    router.replace(allPaths.login);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, pathName, loading]);

    //// remove this console.log after debug
    // useEffect(() => {
    //     console.log('for debug render Auth');
    // }, []);

    return (
        <>
            {loading ? (
                'loading'
            ) : (
                <AuthContext.Provider
                    value={{ user, logout, handleUserUpdate }}
                >
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
    return supabase
        .from('users')
        .select('id:public_id, first_name, last_name, image, about')
        .eq('id', id)
        .single()
        .then(({ data, error }) => {
            if (error) {
                console.error(error.message);
                // throw new Error(error.message);
            }
            return data || null;
        });
};

const createUpdateUser = async ({
    data,
    op,
}:
    | {
          data: Omit<DatabaseTableInsert['users'], 'id' | 'public_id'>;
          op: 'create';
      }
    | {
          data: Omit<DatabaseTableUpdate['users'], 'id'>;
          op: 'update';
      }) => {
    return (
        op === 'create'
            ? supabase.from('users').insert({
                  ...data,
                  public_id: generateUserId(data.first_name),
              })
            : supabase
                  .from('users')
                  .update(data)
                  .eq('public_id', data.public_id)
    )
        .select('id:public_id, first_name, last_name, image, about')
        .single()
        .then(({ data, error }) => {
            if (error) throw new Error(error.message);
            return data;
        });
};
const generateUserId = (str: string) => {
    const prefix = str.substring(0, 4);
    const randomId = Math.floor(100000 + Math.random() * 900000);
    // Return the concatenated result
    return `${prefix}@${randomId}`;
};
