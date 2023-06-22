import { Router } from "express";
import {
  getGroupState,
  getState,
  getStripState,
  setBulbState,
  setGroupState,
  setStripState,
} from "../controllers/govee";
import { checkSchema } from "express-validator";
import { goveeStateSchema } from "../utils/validation";

const router = Router();

router.get("/bulb/state/:deviceName", getState);
router.post(
  "/bulb/state/:deviceName",
  checkSchema(goveeStateSchema),
  setBulbState
);

router.get("/strip/state/:deviceName", getStripState);
router.post("/strip/state/:deviceName", setStripState);

router.get("/group/state/:groupName", getGroupState);
router.post("/group/state/:groupName", setGroupState);

export default router;
