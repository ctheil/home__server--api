import { NextFunction, Request, Response } from "express";
import { getDevice, getGroup } from "../utils/govee";
import { validationResult } from "express-validator";

const getDerivedState = (state: { brightness: number; powerState: string }) => {
  let derivedState: "off" | "half" | "full" = "off";

  if (state.brightness >= 51) {
    derivedState = "full";
  } else if (state.brightness <= 50 && state.brightness > 0) {
    derivedState = "half";
  }
  if (state.powerState === "off") {
    derivedState = state.powerState;
  }
  return derivedState;
};

const sanitizeState = (stateData: any) => {
  const state: any = {};
  stateData.map((d: any) => {
    const keys = Object.keys(d);
    state[keys[0]] = d[keys[0]];
  });
  return state;
};

export const getState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { deviceName } = req.params;
  if (!deviceName)
    return res
      .status(422)
      .json({ message: "No device name provided in the request" });
  try {
    const device = await getDevice(deviceName);
    const stateData = (await device.getState()).data.properties;

    const state = sanitizeState(stateData);

    const derivedState = getDerivedState(state);
    res
      .status(200)
      .json({ message: "Good request", stateData: state, state: derivedState });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      state: "unknown",
      message: "Something went wrong fetching device state.",
    });
  }
};

export const setBulbState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  const errorMessages = errors.array();
  if (errorMessages.length > 0)
    res.status(422).json({ message: "", errors: errorMessages });

  const { deviceName } = req.params;
  const newState = req.body;
  try {
    const device = await getDevice(deviceName);

    newState.powerState = newState.powerState === "on" ? true : false;

    if (newState.powerState) device.turnOn();
    else {
      device.turnOff();
      return res.status(200).json({ message: "Good request" });
    }

    device.setBrightness(newState.brightness);

    if (newState.color) device.setColor(newState.color);
    const derivedState = getDerivedState(newState);
    return res.status(200).json({
      state: derivedState,
      message: "Good request",
      stateData: newState,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Something went wrong setting the state." });
  }
};

export const getStripState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { deviceName } = req.params;

  // const device = await getDevice(deviceName);
  return res.status(410).json({ message: "This endpoint is not ready yet." });
};
export const setStripState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { deviceName } = req.params;

  // const device = await getDevice(deviceName);
  return res.status(410).json({ message: "This endpoint is not ready yet." });
};

const getGroupStates = async (groupName: string) => {};

export const getGroupState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { groupName } = req.params;
  try {
    const devices = await getGroup(groupName);
    if (!devices) {
      throw new Error("Failed to fetch devices");
    }
    const derivedStates = [];
    for (const device of devices) {
      const state = sanitizeState((await device.getState()).data.properties);
      const derivedState = getDerivedState(state);
      derivedStates.push(derivedState);
    }
    const uniqueStates = new Set(derivedStates);
    let groupState;
    if (uniqueStates.size > 1) {
      groupState = "mixed";
    } else {
      groupState = uniqueStates.values().next().value;
    }
    console.log(groupState);

    res.status(200).json({ message: "State returned.", state: groupState });
  } catch (err) {
    res.status(500).json({ message: "Could not get state." });
  }
};

export const setGroupState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { groupName } = req.params;
  try {
    const devices = await getGroup(groupName);
    if (!devices) {
      throw new Error("Devices failed to fetch");
    }
    const newState = req.body;

    newState.powerState = newState.powerState === "on" ? true : false;
    for (let i = 0; i < devices.length; i++) {
      console.log("Toggling device: ", devices[i]);
      console.log("new power state: ", newState.powerState);
      if (!newState.powerState) {
        console.log("RETURNING TURN OFF");
        devices[i].turnOff();
      } else {
        devices[i].turnOn();
        console.log("RETURNING BRIGHTNESS");
        devices[i].setBrightness(newState.brightness);
      }
    }

    res.status(200).json({ message: "State updated!" });
  } catch (err) {
    res.status(500).json({ message: "Could not update state." });
  }
};
