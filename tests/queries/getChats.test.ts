import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server-express';
import schema from '../../schema';

describe('Query Chats', () => {
  it('should fetch all data chats', async () => {
    const server = new ApolloServer({ schema });
    const {query} = createTestClient(server);
    
    const res = await query({
      query: gql`
        query GetChats {
          chats {
            id
            name
            picture
            lastMessage {
              id
              content
              createdAt
            }
          }
        }
      `,
    });

    expect(res.data).toBeDefined();
    expect(res.errors).toBeUndefined();
    expect(res.data).toMatchSnapshot();
  });
});
