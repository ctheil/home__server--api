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
exports.getState = exports.postState = void 0;
const Roku_1 = __importDefault(require("../models/Roku"));
const postState = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const toggleModeTo = req.body.state;
    try {
        if (!toggleModeTo) {
            const error = new Error("No mode to toggle to.");
            throw error;
        }
        let state = yield Roku_1.default.getState();
        if (state.state === toggleModeTo) {
            return res.status(200).json({
                message: `State is already set to ${toggleModeTo}`,
                state: state,
            });
        }
        // const state = await toggle(toggleModeTo);
        const roku = new Roku_1.default();
        console.log(roku);
        const result = yield roku.togglePictureState(toggleModeTo);
        console.log(result);
        state = yield Roku_1.default.getState();
        console.log(state);
        res
            .status(200)
            .json({ message: "Roku picture mode updated", state: state });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to update state...", error: err });
    }
});
exports.postState = postState;
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
