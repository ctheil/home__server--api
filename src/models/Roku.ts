import {
  fetchState,
  initSleep,
  triggerDarkMode,
  triggerLightMode,
  writeState,
} from "../utils/roku";

const delay = (t: number) => new Promise((resolve) => setTimeout(resolve, t));

class Roku {
  // constructor() {}

  async togglePictureState(mode: string) {
    if (mode === "dark") await triggerDarkMode();
    if (mode === "light") await triggerLightMode();
    return delay(2000).then(async () => await this.writeState("state", mode));
  }
  async toggleSleepState(value: number) {
    await initSleep(value);
    return delay(2000).then(
      async () => await this.writeState("sleepState", value)
    );
  }

  async writeState(key: string, newState: string | number) {
    await writeState(key, newState);
  }
  static async getState() {
    return await fetchState();
  }
}

export default Roku;
