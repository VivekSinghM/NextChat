import { useConversationsAndContacts } from '@/context/ConversationProvider/ConversationProvider';
import { useSocket } from '@/context/SocketProvider/SocketProvider';
import { supabase } from '@/utils/supabase/client';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';

const useChat = (id: string) => {
    const { selectedConversation } = useConversationsAndContacts();
    const { chatIo } = useSocket();
    const queryClient = useQueryClient();
    const updateMessages = (
        data: Awaited<
            ReturnType<typeof getChatMessages>
        >['chat_messages'][number]
    ) => {
        queryClient.setQueryData(
            ['chat', id],
            (prevData: Awaited<ReturnType<typeof getChatMessages>>) => {
                const temp = { ...prevData };
                temp.chat_messages = [...(temp?.chat_messages || []), data];
                return temp;
            }
        );
    };

    const handleSendMessage = (message: string) => {
        chatIo.emit(
            'send-message',
            {
                message,
                to: id,
            },
            (data) => {
                if (data) {
                    updateMessages(data);
                }
            }
        );
    };

    useEffect(() => {
        if (selectedConversation?.id && chatIo) {
            chatIo.emit('join', selectedConversation.id);
            chatIo.on('receive-message', (data) => {
                updateMessages(data);
            });
        }
        return () => {
            if (selectedConversation?.id && chatIo) {
                chatIo.off('receive-message');
                chatIo.emit('leave', selectedConversation.id);
            }
        };
    }, [selectedConversation?.id, chatIo]);

    const { data: chatDetails, isFetched } = useQuery({
        queryKey: ['chat', id],
        queryFn: () => getChatMessages(id),
        enabled: !!id,
        // refetchOnMount: false,
        // refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 30,
    });
    return { chatDetails, isFetched, handleSendMessage };
};
export default useChat;

const getChatMessages = async (id: string) => {
    return supabase

        .from('chats')
        .select('*, chat_members(is_admin,id:user_id), chat_messages(*)')
        .eq('id', id)
        .single()
        .then(({ data, error }) => {
            if (error) {
                console.error(error);
                return null;
            }
            return data;
        });
};
