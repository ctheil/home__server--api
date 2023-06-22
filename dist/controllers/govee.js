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
exports.setGroupState = exports.getGroupState = exports.setStripState = exports.getStripState = exports.setBulbState = exports.getState = void 0;
const govee_1 = require("../utils/govee");
const express_validator_1 = require("express-validator");
const getDerivedState = (state) => {
    let derivedState = "off";
    if (state.brightness >= 51) {
        derivedState = "full";
    }
    else if (state.brightness <= 50 && state.brightness > 0) {
        derivedState = "half";
    }
    if (state.powerState === "off") {
        derivedState = state.powerState;
    }
    return derivedState;
};
const sanitizeState = (stateData) => {
    const state = {};
    stateData.map((d) => {
        const keys = Object.keys(d);
        state[keys[0]] = d[keys[0]];
    });
    return state;
};
const getState = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { deviceName } = req.params;
    if (!deviceName)
        return res
            .status(422)
            .json({ message: "No device name provided in the request" });
    try {
        const device = yield (0, govee_1.getDevice)(deviceName);
        const stateData = (yield device.getState()).data.properties;
        const state = sanitizeState(stateData);
        const derivedState = getDerivedState(state);
        res
            .status(200)
            .json({ message: "Good request", stateData: state, state: derivedState });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            state: "unknown",
            message: "Something went wrong fetching device state.",
        });
    }
});
exports.getState = getState;
const setBulbState = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    const errorMessages = errors.array();
    if (errorMessages.length > 0)
        res.status(422).json({ message: "", errors: errorMessages });
    const { deviceName } = req.params;
    const newState = req.body;
    try {
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
        const derivedState = getDerivedState(newState);
        return res.status(200).json({
            state: derivedState,
            message: "Good request",
            stateData: newState,
        });
    }
    catch (err) {
        console.log(err);
        res
            .status(500)
            .json({ message: "Something went wrong setting the state." });
    }
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
const getGroupStates = (groupName) => __awaiter(void 0, void 0, void 0, function* () { });
const getGroupState = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupName } = req.params;
    try {
        const devices = yield (0, govee_1.getGroup)(groupName);
        if (!devices) {
            throw new Error("Failed to fetch devices");
        }
        const derivedStates = [];
        for (const device of devices) {
            const state = sanitizeState((yield device.getState()).data.properties);
            const derivedState = getDerivedState(state);
            derivedStates.push(derivedState);
        }
        const uniqueStates = new Set(derivedStates);
        let groupState;
        if (uniqueStates.size > 1) {
            groupState = "mixed";
        }
        else {
            groupState = uniqueStates.values().next().value;
        }
        console.log(groupState);
        res.status(200).json({ message: "State returned.", state: groupState });
    }
    catch (err) {
        res.status(500).json({ message: "Could not get state." });
    }
});
exports.getGroupState = getGroupState;
const setGroupState = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupName } = req.params;
    try {
        const devices = yield (0, govee_1.getGroup)(groupName);
        if (!devices) {
            throw new Error("Devices failed to fetch");
        }
        const newState = req.body;
        newState.powerState = newState.powerState === "on" ? true : false;
        for (let i = 0; i < devices.length; i++) {
            console.log("Toggling device: ", devices[i]);
            console.log("new power state: ", newState.powerState);
            if (!newState.powerState) {
                console.log("RETURNING TURN OFF");
                devices[i].turnOff();
            }
            else {
                devices[i].turnOn();
                console.log("RETURNING BRIGHTNESS");
                devices[i].setBrightness(newState.brightness);
            }
        }
        res.status(200).json({ message: "State updated!" });
    }
    catch (err) {
        res.status(500).json({ message: "Could not update state." });
    }
});
exports.setGroupState = setGroupState;
