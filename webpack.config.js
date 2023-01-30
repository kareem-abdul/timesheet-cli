const path = require("path");

module.exports = {
    mode: "production",
    entry: "./dist/build/main/node/index.js",
    target: "node",
    output: {
        path: path.resolve(__dirname, "./dist/bundle/"),
        chunkFormat: "commonjs",
        filename: "timesheet.js"
    },
};
