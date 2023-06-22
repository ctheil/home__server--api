"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const roku_1 = __importDefault(require("./routes/roku"));
const govee_1 = __importDefault(require("./routes/govee"));
const accessLogStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, "../data/access.log"), { flags: "a" });
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)("combined", { stream: accessLogStream }));
app.use("/roku", roku_1.default);
app.use("/govee", govee_1.default);
app.listen(8081, () => {
    console.log(`Listening on 8081`);
});
