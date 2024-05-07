import React, {
    Children,
    ReactNode,
    createContext,
    useContext,
    useState,
} from 'react';

export type chatType = {
    id: string;
    created_at: string;
    type: 'message';
    content: { message: string };
    sender: string;
};
interface ChatsProviderInterface {
    chats: chatType[];
    sendMessage: (x: { message: string }) => Promise<boolean>;
}
const initialContactsProvider: ChatsProviderInterface = {
    chats: [],
    async sendMessage(x) {
        return false;
    },
};
const ContactsContext = createContext<ChatsProviderInterface>(
    initialContactsProvider
);

const ChatsProvider = ({ children }: { children: ReactNode }) => {
    const [chats, setChats] = useState<chatType[]>([
        {
            id: 'asdasd',
            content: { message: 'hi' },
            sender: 'xyz',
            created_at: '',
            type: 'message',
        },
        {
            id: 'asdasd',
            content: { message: 'hi' },
            sender: 'abc',
            created_at: '',
            type: 'message',
        },
    ]);
    const sendMessage: ChatsProviderInterface['sendMessage'] = async ({
        message,
    }) => {
        setChats((pre) => [
            ...pre,
            {
                id: crypto.randomUUID(),
                content: { message },
                created_at: '',
                sender: 'abc',
                type: 'message',
            },
        ]);
        return true;
    };
    return (
        <ContactsContext.Provider
            value={{
                chats,
                sendMessage,
            }}
        >
            {children}
        </ContactsContext.Provider>
    );
};

export default ChatsProvider;

export const useChats = () => {
    return useContext(ContactsContext);
};
