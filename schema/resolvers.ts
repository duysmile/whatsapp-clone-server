import { DateTimeResolver, URLResolver } from 'graphql-scalars';
import { chats, messages } from '../db';

const resolvers = {
  Date: DateTimeResolver,
  URL: URLResolver,

  Chat: {
    lastMessage: (chat: any) => {
      return messages.find(
        m => m.id === chat.messages[chat.messages.length - 1]
      );
    },
    messages: (chat: any) => {
      return messages.filter(m => chat.messages.includes(m.id));
    },
  },

  Query: {
    chats() {
      return chats;
    },
    chat(root: any, { chatId }: any) {
      return chats.find(chat => chat.id === chatId);
    },
  },
};

export default resolvers;
