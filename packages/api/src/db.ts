import { PrismaClient } from "@prisma/client";

// This layer is included for
// - If we ever want to vary datasources, we can do so via the PrismaClient props
// - The app only has one PrismaClient, for the moment
// - Other operations, including if prisma ever needs to be swapped out

export const db = new PrismaClient();
