// @ts-ignore
import Govee from "node-govee-led";
import fs from "fs/promises";
import path from "path";

interface Device {
  device: string;
  model: string;
  deviceName: string;
  controllable: boolean;
  retrievable: boolean;
  supportCmds: any[];
  properties: {}[];
}

const GOVEE_API_KEY = "c778f145-07cd-4ea6-b519-c1e06df6ba6e";

export const getDevice = async (deviceName: string) => {
  try {
    const d = await fs.readFile(path.join(__dirname, "../../data/bulbs.json"));
    const devices = JSON.parse(d.toString());
    const target = devices.find((d: any) => {
      return d.deviceName === deviceName;
    });

    if (!target) {
      const error = new Error("no device found.");
      throw error;
    }
    const device = new Govee({
      apiKey: GOVEE_API_KEY,
      mac: target.MAC,
      model: target.model,
    });
    return device;
  } catch (err) {
    console.warn("ERROR IN GET DEVICE: ", err);
    throw err;
  }
};
