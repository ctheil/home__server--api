import { body, Schema } from "express-validator";

export const goveeStateSchema: Schema = {
  powerState: {
    notEmpty: true,
    errorMessage: "Must provide the desired power state.",
  },
  brightness: {
    notEmpty: true,
    // isInt: true,
    // custom: (value: any) => {
    //   if (typeof value !== null || typeof value !== "number") {
    //     return false
    //   }
    //   return true
    // }
    errorMessage: "Must provide a desired brightness as an int.",
  },
  color: {
    notEmpty: false,
    // isHexColor: true,
    errorMessage: "Color must be provided as a hex color",
  },
  // deviceName: {
  //   notEmpty: true,
  //   isString: true,
  //   errorMessage: "Device name is required!",
  // },
};
export const validateGoveeSetState = () => {};
