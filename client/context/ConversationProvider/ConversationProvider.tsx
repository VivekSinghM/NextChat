import { supabase } from '@/utils/supabase/client';
import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useAuthContext } from '../AuthProvider/AuthProvider';
import { DatabaseTableInsert, DatabaseTableUpdate } from '@/types/customSchema';
import { usePathname, useRouter } from 'next/navigation';
import { allPaths } from '@/utils/constant/paths';

export type contactType = {
    id: string;
    name: string;
    image: string;
    is_fav: boolean;
};
interface ConversationProviderInterface {
    contacts: contactType[];
    conversation: Awaited<ReturnType<typeof getConversations>>;
    selectedConversation: this['conversation'][number];
    handleCreateUpdateContact: (
        x:
            | { data: { contact_id: string; is_fav }; type: 'create' }
            | {
                  data: { contact_id: string; is_fav };
                  type: 'update';
              }
    ) => Promise<boolean>;
    handelSelectConversation: (x: this['conversation'][number]) => void;
}
const initialConversationProvider: ConversationProviderInterface = {
    contacts: [],
    conversation: [],
    selectedConversation: null,
    async handleCreateUpdateContact(x) {
        return false;
    },
    handelSelectConversation(x) {},
};
const ConversationContext = createContext<ConversationProviderInterface>(
    initialConversationProvider
);

const ConversationProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuthContext();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [contacts, setContacts] = useState<
        ConversationProviderInterface['contacts']
    >([]);
    const [conversation, setConversation] = useState<
        ConversationProviderInterface['conversation']
    >([]);
    const [selectedConversation, setSelectedConversation] =
        useState<ConversationProviderInterface['selectedConversation']>(null);
    const handleCreateUpdateContact: ConversationProviderInterface['handleCreateUpdateContact'] =
        async ({ data, type }) => {
            return (
                type === 'create'
                    ? createUpdateContact({
                          data: { ...data, own_id: user.otherDetails.id },
                          type,
                      })
                    : createUpdateContact({
                          data: { ...data, own_id: user.otherDetails.id },
                          type,
                      })
            ).then((data) => {
                setContacts((pre) =>
                    type === 'create'
                        ? [data, ...pre]
                        : pre.map((item) => (item.id === data.id ? data : item))
                );
                return true;
            });
        };

    const handelSelectConversation: ConversationProviderInterface['handelSelectConversation'] =
        (conversation) => {
            setSelectedConversation(conversation);
        };
    useEffect(() => {
        if (user.otherDetails.id) {
            Promise.all([
                getContacts(user.otherDetails.id)
                    .then((data) => {
                        setContacts(data);
                    })
                    .catch((e) => {
                        console.error(e);
                        setContacts([]);
                    }),
                getConversations(user.otherDetails.id)
                    .then((data) => {
                        setConversation(data);
                    })
                    .catch((e) => {
                        console.error(e);
                        setContacts([]);
                    }),
            ]).finally(() => {
                setLoading(false);
            });
        }
    }, [user.otherDetails.id]);

    useEffect(() => {
        if (!loading && pathname.includes(allPaths.chat)) {
            const conversation_id = decodeURIComponent(
                pathname.replace(`${allPaths.chat}/`, '')
            );
            // console.log(contact_id);
            if (
                Boolean(conversation.length) &&
                Boolean(conversation_id.trim().length)
            ) {
                setSelectedConversation(
                    conversation.find((item) => item.id === conversation_id) ||
                        null
                );
            } else {
                // router.push(allPaths.chat);
            }
        }
    }, [pathname, loading, contacts]);

    return loading ? (
        <>contacts loading</>
    ) : (
        <ConversationContext.Provider
            value={{
                contacts,
                conversation,
                selectedConversation,
                handleCreateUpdateContact,
                handelSelectConversation,
            }}
        >
            {children}
        </ConversationContext.Provider>
    );
};

export default ConversationProvider;

export const useConversationsAndContacts = () => {
    return useContext(ConversationContext);
};

const getContacts = async (id: string) => {
    return supabase
        .from('contacts')
        .select(
            'is_fav, alias, users!contacts_contact_id_fkey(id:public_id,first_name,last_name,image)'
        )
        .eq('own_id', id)
        .then(({ data, error }) => {
            if (error) throw new Error(error.message);
            return data.map((item) => ({
                id: item.users.id,
                name: `${item.users.first_name} ${item.users.last_name}`.trim(),
                image: item.users.image,
                is_fav: item.is_fav,
                alias: item.alias,
            }));
        });
};

const createUpdateContact = ({
    data,
    type,
}:
    | { data: DatabaseTableInsert['contacts']; type: 'create' }
    | {
          data: Omit<
              DatabaseTableUpdate['contacts'],
              'own_id' | 'contact_id'
          > & { own_id: string; contact_id: string };
          type: 'update';
      }) => {
    return (
        type === 'create'
            ? supabase.from('contacts').insert(data)
            : supabase
                  .from('contacts')
                  .update(data)
                  .eq('own_id', data.own_id)
                  .eq('contact_id', data.contact_id)
    )
        .select(
            'is_fav, alias, users!contacts_contact_id_fkey(id:public_id,first_name,last_name,image)'
        )
        .single()
        .then(({ data, error }) => {
            if (error) throw new Error(error.message);
            return {
                id: data.users.id,
                name: `${data.users.first_name} ${data.users.last_name}`.trim(),
                image: data.users.image,
                is_fav: data.is_fav,
                alias: data.alias,
            };
        });
};

const getConversations = async (id: string) => {
    return supabase
        .from('chats')
        .select('id, name, image, is_group, chat_members()')
        .eq('chat_members.user_id', id)
        .then(({ data, error }) => {
            if (error) throw new Error(error.message);
            return data;
        });
};

const createConversation = async ({
    InsertData,
}: {
    InsertData: DatabaseTableInsert['chats'] & {
        user_ids: string[];
        own_id: string;
    };
}) => {
    return supabase
        .from('chats')
        .insert(InsertData)
        .select('id, name, image, is_group')
        .single()
        .then(({ data: chatData, error }) => {
            if (error) throw new Error(error.message);
            return supabase
                .from('chat_members')
                .insert(
                    InsertData.user_ids.map((user_id) => ({
                        user_id,
                        chat_id: chatData.id,
                        is_admin:
                            chatData.is_group && user_id === InsertData.own_id,
                    }))
                )
                .then(({ error }) => {
                    if (error) throw new Error(error.message);
                    return chatData;
                });
        });
};
