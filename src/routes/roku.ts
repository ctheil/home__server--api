import { Router } from "express";

const router = Router();

import { getState, postState } from "../controllers/roku";

router.get("/state", getState);
router.post("/state", postState);

export default router;
