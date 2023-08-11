import { MongoClient, ServerApiVersion, Collection } from "mongodb";

// Wrapper class so the database such that it can be switched out if necessary
// If we ever want to do this, we would just change over the methods

export class MongoDatabase {
  public provider: string;
  public databaseName: string;
  private client: MongoClient;

  public initialised: boolean = false;

  public routesCollection?: Collection;
  public usersCollection?: Collection;

  /**
   * This establishes the wrapper class for a database within <provider> (MongoDB)
   * @param provider Name of DB provider. For now will always be MongoDB
   * @param dbName Name of database
   */
  constructor(provider: string, dbName: string) {
    this.provider = provider;
    this.databaseName = dbName;

    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@${process.env.MONGO_ID}.mongodb.net/?retryWrites=true&w=majority`;
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
    console.log("Connecting to MongoDB...");
    try {
      await this.client.connect();
    } catch (err: any) {
      throw Error(`Unable to connect mongo - ${err.message}`);
    }

    const db = this.client.db(this.databaseName);

    // Establish collections
    this.routesCollection = db.collection("routes");
    this.usersCollection = db.collection("users");

    // All done!
    console.log("MongoDB connected and initialised!");
    this.initialised = true;
  }
}

const dbName = process.env.NODE_ENV === "prod" ? "bm-prod" : "bm-dev";

// Initialise MongoDB
export const db = new MongoDatabase("MongoDB", dbName);

// Main function for the database
export async function initDb() {
  await db.connect();
}
