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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setStripState = exports.getStripState = exports.setBulbState = exports.getState = void 0;
const govee_1 = require("../utils/govee");
const express_validator_1 = require("express-validator");
const getState = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { deviceName } = req.params;
    if (!deviceName)
        res.status(422).json({ message: "No device name provided in the request" });
    const device = yield (0, govee_1.getDevice)(deviceName);
    const stateData = (yield device.getState()).data.properties;
    const state = {};
    stateData.map((d) => {
        const keys = Object.keys(d);
        state[keys[0]] = d[keys[0]];
    });
    res.status(200).json({ message: "Good request", state: state });
});
exports.getState = getState;
const setBulbState = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    const errorMessages = errors.array();
    if (errorMessages.length > 0)
        res.status(422).json({ message: "", errors: errorMessages });
    const { deviceName } = req.params;
    const newState = req.body;
    const device = yield (0, govee_1.getDevice)(deviceName);
    newState.powerState = newState.powerState === "on" ? true : false;
    if (newState.powerState)
        device.turnOn();
    else {
        device.turnOff();
        return res.status(200).json({ message: "Good request" });
    }
    device.setBrightness(newState.brightness);
    if (newState.color)
        device.setColor(newState.color);
    return res.status(200).json({ message: "Good request" });
});
exports.setBulbState = setBulbState;
const getStripState = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { deviceName } = req.params;
    // const device = await getDevice(deviceName);
    return res.status(410).json({ message: "This endpoint is not ready yet." });
});
exports.getStripState = getStripState;
const setStripState = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { deviceName } = req.params;
    // const device = await getDevice(deviceName);
    return res.status(410).json({ message: "This endpoint is not ready yet." });
});
exports.setStripState = setStripState;
