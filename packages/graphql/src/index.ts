import { MongoDatabase } from "./database";
import { server } from "./apollo"
import {app, httpServer} from "./express"

// GQL and Apollo server initialised in ./apollo

// WS Server and HTTP server initialised in ./express

// Initialise MongoDB
export const db = new MongoDatabase("MongoDB", "BoulderMate")

async function startServer() {
  await db.connect()

  const PORT = process.env.PORT || 8000;
  await server.start();
  server.applyMiddleware({ app, path: "/" });

  httpServer.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
}

startServer();
