import { Router } from "express";

const router = Router();

import { getState, postSleep, postState } from "../controllers/roku";

router.get("/state", getState);
router.post("/state", postState);

router.get("/sleep", getState);
router.post("/sleep", postSleep);

export default router;
