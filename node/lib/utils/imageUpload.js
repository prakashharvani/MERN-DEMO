

const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const dotenv = require("dotenv");
dotenv.config();


cloudinary.config({
    cloud_name: process.env.cloudinarycloud_name,
    api_key: process.env.cloudinaryapi_key,
    api_secret: process.env.cloudinaryapi_secret
});


async function imageStoreOne(req) {
    let d = req.name.toString();
    return await new Promise(async (resolve, reject) => {
        await fs.writeFile(d, req.data, 'binary', async function () {
            await cloudinary.uploader.upload(d).then(async (result) => {
                if (result) {

                    resolve(result.url);
                    fs.unlink(d, function (err) {
                        if (err) throw err;
                    });

                } else {
                    reject(error);
                }
            }).catch((error) => {
                reject(error);
            });
        });
    });
}


module.exports = {
    imageStoreOne
}