const fs = require("fs");
const path = require("path");

//function that imports .graphql files
const importGraphQL = (file: any) => {
  return fs.readFileSync(path.join(__dirname, file), "utf-8");
};

// const OCPI_GQL = importGraphQL("../schema/OCPI.graphql");

export default [
  // OCPI_GQL,
];
