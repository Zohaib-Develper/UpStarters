require('dotenv').config();
const AppError = require('./appError');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

exports.uploadOnCloudinary = async (filepath) => {
    if (!filepath) {
        throw new AppError('Kindly upload the file again!', 400);
    }

    console.log(filepath)

    try {
        const res = await cloudinary.uploader.upload(filepath, {
            resource_type: 'auto',
            folder: 'UpStarters'
        });

        return res.secure_url; // Return the Cloudinary response
    }
    catch (error) {
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath); // Delete the file locally
        }
        throw new AppError('Cloudinary upload failed. Please try again later.', 500); // Throw an error
    }
};
