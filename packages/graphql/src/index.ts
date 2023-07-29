import {initDb} from "./database"
import {initApolloServer} from "./server"

// Sequentially initialise all services, then the server itself
async function startServer() {
  await initDb();
  await initApolloServer();
}

startServer();