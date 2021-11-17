const path = require('path');

module.exports ={
    entry:{
        index: "./src/index.js",
        send_data_btn: "./src/send_data_btn.js"
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, "dist")
    }
}