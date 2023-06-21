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
exports.fetchState = exports.toggle = exports.writeState = exports.triggerLightMode = exports.triggerDarkMode = void 0;
// @ts-ignore
const rokujs_1 = __importDefault(require("rokujs"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const roku = new rokujs_1.default("192.168.0.47");
const int = 0;
const openMenu = () => __awaiter(void 0, void 0, void 0, function* () {
    // toggle settings
    yield roku.press(rokujs_1.default.keys[11]);
    yield roku.delay(int);
});
const navToPicture = () => __awaiter(void 0, void 0, void 0, function* () {
    // nav to picture
    yield roku.press("down");
    yield roku.delay(int);
    // enter
    yield roku.press(rokujs_1.default.keys[4]);
    yield roku.delay(int);
});
const navToBrightness = () => __awaiter(void 0, void 0, void 0, function* () {
    // enter into brightness
    yield roku.press(rokujs_1.default.keys[4]);
    yield roku.delay(int);
});
const navToPictureMode = () => __awaiter(void 0, void 0, void 0, function* () {
    // => picture mode
    yield roku.press("down");
    yield roku.delay(int);
    // enter
    yield roku.press(rokujs_1.default.keys[4]);
    yield roku.delay(int);
});
const exit = () => __awaiter(void 0, void 0, void 0, function* () {
    // exit
    yield roku.press(rokujs_1.default.keys[11]);
    yield roku.delay(int);
});
const triggerDarkMode = () => __awaiter(void 0, void 0, void 0, function* () {
    yield openMenu();
    yield navToPicture();
    yield navToBrightness();
    // from brighter => darker
    yield roku.press("down");
    yield roku.delay(int);
    // enter
    yield roku.press(rokujs_1.default.keys[4]);
    yield roku.delay(int);
    yield navToPictureMode();
    // from brighter => darker
    yield roku.press("down");
    yield roku.delay(int);
    // enter
    yield roku.press(rokujs_1.default.keys[4]);
    yield roku.delay(int);
    yield exit();
});
exports.triggerDarkMode = triggerDarkMode;
const triggerLightMode = () => __awaiter(void 0, void 0, void 0, function* () {
    yield openMenu();
    yield navToPicture();
    yield navToBrightness();
    // from darker => brighter
    yield roku.press("up");
    yield roku.delay(int);
    // enter
    yield roku.press(rokujs_1.default.keys[4]);
    yield roku.delay(int);
    yield navToPictureMode();
    // from darker => brighter
    yield roku.press("up");
    yield roku.delay(int);
    // enter
    yield roku.press(rokujs_1.default.keys[4]);
    yield roku.delay(int);
    yield exit();
});
exports.triggerLightMode = triggerLightMode;
const p = path_1.default.join(__dirname, "../../data/state.json");
const checkState = () => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const state = yield promises_1.default.readFile(p, (err, data) => {
        if (err) {
            return { error: "failed to get state." };
        }
        return data;
    });
    return JSON.parse(state);
});
const writeState = (newState) => __awaiter(void 0, void 0, void 0, function* () {
    const state = { state: newState };
    yield promises_1.default.writeFile(p, JSON.stringify(state));
});
exports.writeState = writeState;
// add additional args for getting state and such for home assistant to trigger change in state.
// test with different media types for different layout onscreen (i.e. dolby vs !4k)
const toggle = (argv) => __awaiter(void 0, void 0, void 0, function* () {
    if (argv === "dark") {
        yield (0, exports.triggerDarkMode)();
    }
    else if (argv === "light") {
        yield (0, exports.triggerLightMode)();
    }
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, exports.writeState)(argv);
        return yield checkState();
    }), 2000);
});
exports.toggle = toggle;
const fetchState = () => __awaiter(void 0, void 0, void 0, function* () {
    const state = yield checkState();
    return state;
});
exports.fetchState = fetchState;
