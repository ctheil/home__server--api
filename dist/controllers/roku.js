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
exports.getState = exports.postMode = void 0;
const Roku_1 = __importDefault(require("../models/Roku"));
const postMode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const toggleModeTo = req.body.mode;
    try {
        let state = yield Roku_1.default.getState();
        if (state.state === toggleModeTo) {
            return res
                .status(304)
                .json({ message: `State is already set to ${toggleModeTo}` });
        }
        // const state = await toggle(toggleModeTo);
        const roku = new Roku_1.default();
        const result = yield roku.togglePictureState(toggleModeTo);
        state = yield Roku_1.default.getState();
        res
            .status(200)
            .json({ message: "Roku picture mode updated", state: state });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to update state...", error: err });
    }
});
exports.postMode = postMode;
const getState = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const state = yield Roku_1.default.getState();
        res.status(200).json(state);
    }
    catch (err) {
        res.status(500).json({ message: "Could not get roku state." });
    }
});
exports.getState = getState;
