const { info, convert } = require('easyimage');

const getImageInfo = async path => {
    try {
        return info(path);
    } catch(e) {
        console.log('error', e);
    }
}

const convertImage = async (path, dest) => {
    try {
        return convert({
            src: path,
            dst: dest,
        })
    } catch(e) {
        console.log('error', e);
    }
}

getImageInfo('./approved.jpg').then(s=>console.log('info retrieve success', s)).catch(e=>console.log(e));
convertImage('./approved.jpg', "approved.webp").then(s=>console.log('conversion success', s)).catch(e=>console.log(e));