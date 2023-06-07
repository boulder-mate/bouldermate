"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REQUEST_PREFIX = void 0;
const NODE_ENV = process.env.NODE_ENV;
exports.REQUEST_PREFIX = NODE_ENV === "local" ? "http" : "https";
if (!process.env.NODE_ENV) {
    throw "Invalid Node env supplied!";
}
//# sourceMappingURL=envManager.js.map