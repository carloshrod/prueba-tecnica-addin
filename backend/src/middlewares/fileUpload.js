const FileUpload = require('express-fileupload');

exports.fileUpload = FileUpload({
    useTempFiles: true,
    tempFileDir: './src/tmp'
})
