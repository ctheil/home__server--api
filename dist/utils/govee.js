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
const GoveeClient = new node_govee_led_1.default({
    apiKey: "c778f145-07cd-4ea6-b519-c1e06df6ba6e",
    mac: "",
    model: "",
});
const getDevice = (deviceName) => __awaiter(void 0, void 0, void 0, function* () {
    const devices = yield GoveeClient.getDevices();
    const target = devices.devices.find((d) => {
        return d.deviceName === deviceName;
    });
    if (!target) {
        return;
    }
    const device = new node_govee_led_1.default({
        apiKey: process.env.GOOVE_API_KEY,
        mac: target.device,
        model: target.model,
    });
    return device;
});
exports.getDevice = getDevice;
