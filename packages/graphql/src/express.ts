import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Server } from "ws";
import { createServer } from "http";
import { graphqlUploadExpress } from "graphql-upload";

var Fingerprint = require("express-fingerprint");

// Initialise Express App
export const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
app.use(Fingerprint());

// Initialise HTTP server
export const httpServer = createServer(app);

// Initialise WS server
export const wsServer = new Server({
  path: "/",
  server: httpServer,
});