import { NextFunction, Request, Response } from "express";
import { getDevice } from "../utils/govee";
import { validationResult } from "express-validator";

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

    const state: any = {};

    stateData.map((d: any) => {
      const keys = Object.keys(d);
      state[keys[0]] = d[keys[0]];
    });

    const derivedState =
      state.brightness >= 51
        ? "full"
        : state.brightness <= 50 && state.brightness > 0
        ? "half"
        : "off";

    res
      .status(200)
      .json({ message: "Good request", stateData: state, state: derivedState });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        message: "Something went wrong fetching device state.",
        state: "unknown",
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
    return res.status(200).json({ message: "Good request" });
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
