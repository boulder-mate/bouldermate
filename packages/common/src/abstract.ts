
// We can't use ObjectID because it breaks when importing common to the mobile app
// Expo does not support importing Node source code from a third party file (which is used in mongodb package)
// However these are always ObjectIDs or strings
export type ID = {
    _id: any
}

// These strings are those associated with an ObjectID we wish to point to
export type LinkedID = string

// ISO String for creation of objects
export type Time = {
    created: string,
    last_updated: string
}