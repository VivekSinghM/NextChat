import React, {
    Children,
    ReactNode,
    createContext,
    useContext,
    useState,
} from 'react';

export type contactType = {
    id: string;
    name: string;
    image: string;
    lastMessage?: string;
};
interface ContactsProviderInterface {
    contacts: contactType[];
    addContacts: (x: contactType) => Promise<boolean>;
    handelSelectContact: (x: contactType) => void;
}
const initialContactsProvider: ContactsProviderInterface = {
    contacts: [],
    async addContacts(x) {
        return false;
    },
    handelSelectContact(x) {},
};
const ContactsContext = createContext<ContactsProviderInterface>(
    initialContactsProvider
);

const ContactsProvider = ({ children }: { children: ReactNode }) => {
    const [contacts, setContacts] = useState<contactType[]>([]);
    const addContacts: ContactsProviderInterface['addContacts'] = async (
        contact
    ) => {
        setContacts((pre) => [...pre, contact]);
        return true;
    };
    const handelSelectContact: ContactsProviderInterface['handelSelectContact'] =
        () => {};
    return (
        <ContactsContext.Provider
            value={{
                contacts: [
                    {
                        id: 'sdfsdf',
                        name: 'VS',
                        image: 'asda',
                    },
                ],
                addContacts,
                handelSelectContact,
            }}
        >
            {children}
        </ContactsContext.Provider>
    );
};

export default ContactsProvider;

export const useContacts = () => {
    return useContext(ContactsContext);
};
