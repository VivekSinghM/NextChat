import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Socket, io } from 'socket.io-client';
import { useAuthContext } from '../AuthProvider/AuthProvider';

interface SocketProviderInterface {
    chatIo: Socket;
}
const initialConversationProvider: SocketProviderInterface = {
    chatIo: null,
};
const SocketContext = createContext<SocketProviderInterface>(
    initialConversationProvider
);

const webSocketUrl = process.env.WEB_SOCKET_URL!;
const chatNamespace = process.env.CHAT_NAMESPACE!;

if (!webSocketUrl || !chatNamespace) {
    throw new Error('Env variables webSocketUrl or chatNamespace not found!');
}

const SocketProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuthContext();
    const [chatIo, setChatIo] =
        useState<SocketProviderInterface['chatIo']>(null);
    // chatIo.

    useEffect(() => {
        if (user.otherDetails.id) {
            const conIo = io(`${webSocketUrl}/${chatNamespace}`, {
                query: { id: user.otherDetails.id },
            });
            // conIo.on('connect', () => {
            //     console.log('connected to server');
            // });
            setChatIo(conIo);
        }
        return () => {
            chatIo && chatIo.close();
        };
    }, [user.otherDetails.id]);
    return (
        <SocketContext.Provider
            value={{
                chatIo,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;

export const useSocket = () => {
    return useContext(SocketContext);
};
