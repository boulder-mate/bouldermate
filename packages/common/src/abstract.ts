import { ObjectId } from "mongodb"


// All objects are identified via MongoDBs ObjectID type
// This is defined to append to typedefs
export type ID = {
    _id: ObjectId
}

// Helps clarify stored IDs which are not the objects own ID
export type LinkedID = ObjectId

export function newId(): ID {
    return {_id: new ObjectId()}
}

// ISO String for creation of objects
export type Time = {
    created: string,
    last_updated: string
}

export function newTime(): Time {
    return {
        created: new Date().toISOString(),
        last_updated: new Date().toISOString(),
    }
}