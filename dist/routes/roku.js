"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const roku_1 = require("../controllers/roku");
router.post("/mode", roku_1.postMode);
router.get("/state", roku_1.getState);
exports.default = router;
