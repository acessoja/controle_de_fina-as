import { baseState } from "./entities/state.js";
import { loadState, saveState } from "./infrastructure/storage.js";
import { startApp } from "./interface/app.js";

const state = loadState(baseState);
startApp(state, saveState);
