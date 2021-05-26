"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const util = __importStar(require("./lib/http"));
const handler = async function (event, context) {
    const headers = Object.keys(event.headers);
    for (const key of headers) {
        event.headers[key.toLowerCase()] = event.headers[key];
    }
    const re = await util.handler({ method: event.httpMethod, path: event.path, headers: event.headers, body: Buffer.from(event.body || '', event.isBase64Encoded ? 'base64' : 'utf8') });
    const r = { statusCode: re.statusCode, body: typeof re.body == 'string' ? re.body : re.body.toString('base64'), headers: re.headers, isBase64Encoded: typeof re.body != 'string' };
    return r;
};
exports.handler = handler;
