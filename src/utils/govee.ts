// @ts-ignore
import Govee from "node-govee-led";
import dotenv from "dotenv";

dotenv.config();

// const testClient = {
//   apiKey:
// }

// // Turn on
// Client.turnOn();
// // Turn off
// Client.turnOff();
// // Set color
// Client.setColor("<hex color code here>");
// // Set brightness
// Client.setBrightness(<number from 1-100>);
// // Get device state
// Client.getState();

interface Device {
  device: string;
  model: string;
  deviceName: string;
  controllable: boolean;
  retrievable: boolean;
  supportCmds: any[];
  properties: {}[];
}

const GoveeClient = new Govee({
  apiKey: process.env.GOOVE_API_KEY,
  mac: "",
  model: "",
});

export const getDevice = async (deviceName: string) => {
  const devices: { devices: Device[] } = await GoveeClient.getDevices();
  const target = devices.devices.find((d: Device) => {
    return d.deviceName === deviceName;
  });
  if (!target) {
    return;
  }
  const device = new Govee({
    apiKey: process.env.GOOVE_API_KEY,
    mac: target.device,
    model: target.model,
  });
  return device;
};
