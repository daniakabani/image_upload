const uploadFile = require("../middlewares"),
    baseURL = "http://localhost:8080/files/",
    sharp = require('sharp'),
    fs = require('fs');

const base64Encoder = (path) => {
    let bitmap = fs.readFileSync(path);
    return new Buffer(bitmap).toString('base64');
};

const upload = async (req, res) => {
    try {
        await uploadFile(req, res);

        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file" });
        }
        
        let base64Image = base64Encoder(__basedir + `/public/${req.file.originalname}`);
        let bufferImage = Buffer.from(base64Image, 'base64');
        sharp(bufferImage)
        .resize(500, 500)
        .toFile(`./public/${req.file.originalname.split('.')[0]}.webp`, (error, res) => {
            if (error) {
                console.log('iimage conversion failed: ', error);
            } else {
                console.log('image conversion success', res);
            }
        });
        sharp(bufferImage)
        .resize(500, 500)
        .toFile(`./public/${req.file.originalname.split('.')[0]}.png`, (error, res) => {
            if (error) {
                console.log('iimage conversion failed: ', error);
            } else {
                console.log('image conversion success', res);
            }
        });

        res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
        });
    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
              message: "File size cannot be larger than 2MB",
            });
          }
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
};

const getListFiles = (req, res) => {
    const directoryPath = __basedir + "/public/";

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan files",
            });
        }

        let fileInfos = [];

        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: baseURL + file,
            });
        });

        res.status(200).send(fileInfos);
    });
};

const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/public/";

    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};

module.exports = {
    upload,
    getListFiles,
    download,
};