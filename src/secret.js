require('dotenv').config();

const mongoDbUrl= process.env.MONGODB_URL;
const secretKey = process.env.JWT_SECRET_KEY;
const cloudinaryCloudName= process.env.CLOUDINARY_CLOUD_NAME;
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
const cloudinarySecretKey = process.env.CLOUDINARY_API_SECRET_KEY;

module.exports = {
    secretKey,
    mongoDbUrl,
    cloudinaryCloudName,
    cloudinaryApiKey,
    cloudinarySecretKey
}