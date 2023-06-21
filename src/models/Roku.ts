import {
  fetchState,
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
    return delay(2000).then(async () => await this.writeState(mode));
  }

  async writeState(newState: string) {
    await writeState(newState);
  }
  static async getState() {
    return await fetchState();
  }
}

export default Roku;
