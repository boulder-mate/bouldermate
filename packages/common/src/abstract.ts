// We can't use ObjectID because it breaks when importing common to the mobile app
// Expo does not support importing Node source code from a third party file (which is used in mongodb package)
// However these are always ObjectIDs or strings
export type ID = {
  id: string;
};

// These identify in the type definitions that we are pointing to something else's ID
export type LinkedID = string;

// ISO String for creation of objects
export type Time = {
  created: Date;
  last_updated: Date;
};
