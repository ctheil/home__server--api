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
const roku_1 = require("../utils/roku");
const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));
class Roku {
    // constructor() {}
    togglePictureState(mode) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mode === "dark")
                yield (0, roku_1.triggerDarkMode)();
            if (mode === "light")
                yield (0, roku_1.triggerLightMode)();
            return delay(2000).then(() => __awaiter(this, void 0, void 0, function* () { return yield this.writeState("state", mode); }));
        });
    }
    toggleSleepState(value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, roku_1.initSleep)(value);
            return delay(2000).then(() => __awaiter(this, void 0, void 0, function* () { return yield this.writeState("sleepState", value); }));
        });
    }
    writeState(key, newState) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, roku_1.writeState)(key, newState);
        });
    }
    static getState() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, roku_1.fetchState)();
        });
    }
}
exports.default = Roku;
