// @ts-ignore
import Roku from "rokujs";
import fs from "fs/promises";
import path from "path";

// const roku = new Roku("192.168.0.47"); // WIRELESS IP
const roku = new Roku("192.168.0.56"); // WIRELESS IP
const int = 100;

const openMenu = async () => {
  // toggle settings
  await roku.press(Roku.keys[11]);
  await roku.delay(int);
};

const navToPicture = async () => {
  // nav to picture
  await roku.press("down");
  await roku.delay(int);

  // enter
  await roku.press(Roku.keys[4]);
  await roku.delay(int);
};
const navToBrightness = async () => {
  // enter into brightness
  await roku.press(Roku.keys[4]);
  await roku.delay(int);
};
const navToPictureMode = async () => {
  // => picture mode
  await roku.press("down");
  await roku.delay(int);

  // enter
  await roku.press(Roku.keys[4]);
  await roku.delay(int);
};

const exit = async () => {
  // exit
  await roku.press(Roku.keys[11]);
  await roku.delay(int);
};

export const triggerDarkMode = async () => {
  await openMenu();
  await navToPicture();
  await navToBrightness();

  // from brighter => darker
  await roku.press("down");
  await roku.delay(int);

  // enter
  await roku.press(Roku.keys[4]);
  await roku.delay(int);

  await navToPictureMode();

  // from brighter => darker
  await roku.press("down");
  await roku.delay(int);

  // enter
  await roku.press(Roku.keys[4]);
  await roku.delay(int);

  await exit();
};

export const triggerLightMode = async () => {
  await openMenu();
  await navToPicture();
  await navToBrightness();

  // from darker => brighter
  await roku.press("up");
  await roku.delay(int);

  // enter
  await roku.press(Roku.keys[4]);
  await roku.delay(int);

  await navToPictureMode();

  // from darker => brighter
  await roku.press("up");
  await roku.delay(int);

  // enter
  await roku.press(Roku.keys[4]);
  await roku.delay(int);

  await exit();
};

export const initSleep = async (value: number) => {
  await openMenu();

  await roku.press(Roku.keys[4]);
  await roku.delay(int);

  // value passed in plus one => 0 === 0.5; 1 === 1; 2 === 1.5 ...

  for (let i = 0; i < value; i++) {
    await roku.press("down");
    await roku.delay(int);
  }
  await roku.press(Roku.keys[4]);
  await roku.delay(int);

  await exit();
};

const p = path.join(__dirname, "../../data/state.json");
const checkState = async () => {
  // @ts-ignore
  const state = await fs.readFile(p, (err: any, data: any) => {
    if (err) {
      return { error: "failed to get state." };
    }
    return data;
  });
  return JSON.parse(state);
};

export const writeState = async (key: string, newState: string | number) => {
  const state = { state: newState };
  const oldState = await checkState();

  await fs.writeFile(p, JSON.stringify({ ...oldState, [key]: newState }));
};

// add additional args for getting state and such for home assistant to trigger change in state.
// test with different media types for different layout onscreen (i.e. dolby vs !4k)

// export const toggle = async (argv: string) => {
//   if (argv === "dark") {
//     await triggerDarkMode();
//   } else if (argv === "light") {
//     await triggerLightMode();
//   }
//   setTimeout(async () => {
//     await writeState(argv);
//     return await checkState();
//   }, 2000);
// };

export const fetchState = async () => {
  const state = await checkState();
  return state;
};
