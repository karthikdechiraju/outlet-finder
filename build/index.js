"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
// path for static files
app.use(express_1.default.static(path_1.default.join(__dirname, 'client', 'build')));
app.use(body_parser_1.default.json());
app.post('/location', (req, res) => {
    res.json(req.body);
});
app.get("*", (req, res) => {
    res.render(path_1.default.resolve(__dirname, "client", "build", "index.html"));
});
app.listen('5000', () => {
    console.log('server started listening on port 5000');
});
