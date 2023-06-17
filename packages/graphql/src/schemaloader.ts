const fs = require("fs");
const path = require("path");

//function that imports .graphql files
const importGraphQL = (file: any) => {
  return fs.readFileSync(path.join(__dirname, file), "utf-8");
};

const ROUTES_GQL = importGraphQL("../schema/Routes.graphql");
const FEEDBACK_GQL = importGraphQL("../schema/Feedback.graphql");
const UPLOAD_GQL = importGraphQL("../schema/Upload.graphql");

export default [
  ROUTES_GQL,
  FEEDBACK_GQL,
  UPLOAD_GQL
];
