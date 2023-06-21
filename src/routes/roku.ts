import { Router } from "express";

const router = Router();

import { getState, postMode } from "../controllers/roku";

router.post("/mode", postMode);
router.get("/state", getState);

export default router;
