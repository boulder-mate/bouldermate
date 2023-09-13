import { Organisation } from "@prisma/client";
import { db } from "../db";

type OrgSearchInput = {
  id?: string;
  email?: string;
};

// The database logic of organisations potentially needs refinement

export async function searchOrganisation(args: OrgSearchInput) {
  var query = {} as any;
  if (args.id) query = { id: args.id };
  else if (args.email) query = { email: args.email };
  else {
    throw new Error(
      "None of id or email fields were supplied to query the organisation"
    );
  }

  return await db.organisation.findUnique({ where: query });
}
