"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
//function that imports .graphql files
const importGraphQL = (file) => {
    return fs.readFileSync(path.join(__dirname, file), "utf-8");
};
// const OCPI_GQL = importGraphQL("../schema/OCPI.graphql");
exports.default = [
// OCPI_GQL,
];
//# sourceMappingURL=schemaloader.js.map