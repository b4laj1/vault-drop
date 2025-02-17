require('dotenv').config()
const multer = require('multer')
const multerS3 = require('multer-s3')
const {S3Client, GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const path = require('path');


const s3 = new S3Client({
    region:process.env.AWS_REGION,
    credentials:{
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
        accessKeyId:process.env.AWS_ACCESS_KEY_ID
    }
}) 

const allowedExtensions = ['.txt', '.jpg', '.jpeg', '.png'];

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `uploads/${Date.now()}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      return cb(new Error('File type not allowed'));
    }
    cb(null, true);
  },
});

const getSignedUrlForFile = async (params) => {
  const command = new GetObjectCommand({
      Bucket: params.Bucket,
      Key: params.Key 
  });

  return getSignedUrl(s3, command, { expiresIn: params.Expires });
};

module.exports = {upload, getSignedUrlForFile}