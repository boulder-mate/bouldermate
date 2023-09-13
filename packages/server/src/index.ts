import {initApolloServer} from "./server"

// Sequentially initialise all services, then the server itself
async function startServer() {
  await initApolloServer();
}

startServer();