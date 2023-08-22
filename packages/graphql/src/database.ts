import { MongoClient, ServerApiVersion, Collection } from "mongodb";
import { Logger } from "./utils/logging";
import env from "./envManager";

// Wrapper class so the database such that it can be switched out if necessary
// If we ever want to do this, we would just change over the methods

export class MongoDatabase {
  public provider: string;
  public databaseName: string;
  private client: MongoClient;

  public initialised: boolean = false;

  public routesCollection?: Collection;
  public usersCollection?: Collection;
  public locationsCollection?: Collection;

  /**
   * This establishes the wrapper class for a database within <provider> (MongoDB)
   * @param provider Name of DB provider. For now will always be MongoDB
   * @param dbName Name of database
   */
  constructor(provider: string, dbName: string) {
    this.provider = provider;
    this.databaseName = dbName;

    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    var uri = env.MONGO_URL as any;

    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }

  /**
   * Initialises the database connection and establishes all the collection variables
   */
  public async connect() {
    // Establish client connection and database
    logger.info("Connecting...");
    try {
      await this.client.connect();
    } catch (err: any) {
      throw Error(`Unable to connect Mongo - ${err.message}`);
    }

    const db = this.client.db(this.databaseName);

    // Establish collections
    this.routesCollection = db.collection("routes");
    this.usersCollection = db.collection("users");
    this.locationsCollection = db.collection("locations");

    // All done!
    logger.info("Connected and initialised!");
    this.initialised = true;
  }
}

// Initialise MongoDB
export const db = new MongoDatabase("MongoDB", env.MONGO_DB_NAME as any);

// Main function for the database
export async function initDb() {
  await db.connect();
}

const logger = Logger.of(MongoDatabase);
