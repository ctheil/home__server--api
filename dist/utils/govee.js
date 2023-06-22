"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDevice = void 0;
// @ts-ignore
const node_govee_led_1 = __importDefault(require("node-govee-led"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const GOVEE_API_KEY = "c778f145-07cd-4ea6-b519-c1e06df6ba6e";
const getDevice = (deviceName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const d = yield promises_1.default.readFile(path_1.default.join(__dirname, "../../data/bulbs.json"));
        const devices = JSON.parse(d.toString());
        const target = devices.find((d) => {
            return d.deviceName === deviceName;
        });
        if (!target) {
            const error = new Error("no device found.");
            throw error;
        }
        const device = new node_govee_led_1.default({
            apiKey: GOVEE_API_KEY,
            mac: target.MAC,
            model: target.model,
        });
        return device;
    }
    catch (err) {
        console.warn("ERROR IN GET DEVICE: ", err);
        throw err;
    }
});
exports.getDevice = getDevice;
