import "@tensorflow/tfjs-node";
import * as faceApi from "face-api.js";
import canvas from "canvas";

const { Canvas, Image, ImageData } = canvas;
faceApi.env.monkeyPatch({ Canvas, Image, ImageData } as any);

export { canvas };
