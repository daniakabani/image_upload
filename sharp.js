const sharp = require('sharp'),
    fs = require('fs');

const base64Encoder = (path) => {
    let bitmap = fs.readFileSync(path);
    return new Buffer(bitmap).toString('base64');
}

const convertImage = (path, width, height) => {
    let base64Image = base64Encoder(path);
    let bufferImage = Buffer.from(base64Image, 'base64');
    sharp(bufferImage)
    .resize(width, height)
    .toFile('approved.webp', (error, res) => {
        if (error) {
            console.log('failed: ', error);
        } else {
            console.log('conversion success', res);
        }
    })
};

convertImage("approved.jpg", 500, 500);