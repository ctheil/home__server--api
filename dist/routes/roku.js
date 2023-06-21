"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const roku_1 = require("../controllers/roku");
router.get("/state", roku_1.getState);
router.post("/state", roku_1.postState);
exports.default = router;
