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
    chat(_root: any, { chatId }: any) {
      return chats.find(chat => chat.id === chatId);
    },
  },

  Mutation: {
    addMessage(_root: any, { chatId, content }: any) {
      const chatIndex = chats.findIndex(chat => chat.id === chatId);
      if (chatIndex === - 1) {
        return null;
      }

      const chat = chats[chatIndex];

      const messageIds = messages.map(message => Number(message.id));
      const messageId = String(Math.max(...messageIds) + 1);
      const message = {
        content,
        id: messageId,
        createdAt: new Date(),
      };

      messages.push(message);
      chat.messages.push(messageId);
      // order last chat in top
      chats.splice(chatIndex, 1);
      chats.unshift(chat);

      return message;
    },
  },
};

export default resolvers;
