"use strict";

import {router} from "./script/router.js";
import {initializeParticles} from "./script/initializeParticles.js";

window.addEventListener("hashchange", router);
window.addEventListener("load", router);

initializeParticles();
