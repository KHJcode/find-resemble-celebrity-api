/* eslint-disable */

const fs = require("fs");


const TENSORFLOW_TFJSNODE_DLL_PATH =
  "node_modules/@tensorflow/tfjs-node/deps/lib/tensorflow.dll";
const TARGET_PATH = "node_modules/@tensorflow/tfjs-node/lib/napi-v5/tensorflow.dll";
const PACKAGE_CONFIG_COMPLETE_MESSAGE = "Package config is complete.";
const PACKAGE_CONFIG_ERROR_MESSAGE = "[PACKAGE CONFIG ERROR]: Please reinstall the package.";


function checkFileIsExistByPath(path) {
  try {
    fs.statSync(path);
  } catch (err) {
    return false;
  }
  return true;
}

function runPackageConfig(oldPath, newPath, callback) {
  const readStream = fs.createReadStream(oldPath);
  const writeStream = fs.createWriteStream(newPath);
  readStream.on('error', callback);
  writeStream.on('error', callback);
  readStream.on('close', () => fs.unlink(oldPath, callback));
  readStream.pipe(writeStream);
}

(function bootstrap() {
  const originalFileIsExist = checkFileIsExistByPath(TENSORFLOW_TFJSNODE_DLL_PATH);
  const fileInTargetPath = checkFileIsExistByPath(TARGET_PATH);
  if (originalFileIsExist === fileInTargetPath) throw new Error(PACKAGE_CONFIG_ERROR_MESSAGE);
  if (originalFileIsExist) {
    runPackageConfig(TENSORFLOW_TFJSNODE_DLL_PATH, TARGET_PATH, (err) => {
      if (err) throw err;
    });
  }
  console.log(PACKAGE_CONFIG_COMPLETE_MESSAGE);
})();
