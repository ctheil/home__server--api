import { NextFunction, Request, Response } from "express";
import { toggle, fetchState, writeState } from "../utils/roku";
import Roku from "../models/Roku";

interface Controller {
  req: Request;
  res: Response;
  next: NextFunction;
}

export const postState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const toggleModeTo = req.body.state;

  try {
    if (!toggleModeTo) {
      const error = new Error("No mode to toggle to.");
      throw error;
    }
    let state = await Roku.getState();
    if (state.state === toggleModeTo) {
      return res.status(200).json({
        message: `State is already set to ${toggleModeTo}`,
        state: state,
      });
    }
    // const state = await toggle(toggleModeTo);
    const roku = new Roku();
    console.log(roku);
    const result = await roku.togglePictureState(toggleModeTo);
    console.log(result);

    state = await Roku.getState();
    console.log(state);

    res
      .status(200)
      .json({ message: "Roku picture mode updated", state: state });
  } catch (err) {
    res.status(500).json({ message: "Failed to update state...", error: err });
  }
};

export const getState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const state = await Roku.getState();

    res.status(200).json(state);
  } catch (err) {
    res.status(500).json({ message: "Could not get roku state." });
  }
};
