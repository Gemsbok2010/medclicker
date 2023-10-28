const S3 = require("aws-sdk/clients/s3");
require("dotenv/config");
const fs = require("fs");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({ region, accessKeyId, secretAccessKey });

// uploads a file to S3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };
  return s3.upload(uploadParams).promise();
}
exports.uploadFile = uploadFile;

// retrieve a file from S3

function getFileStream(fileKey) {
  const signParams = {
    Key: fileKey,
    Bucket: bucketName,
  };
  return s3.getSignedUrlPromise("getObject", signParams);
}
exports.getFileStream = getFileStream;

// uploads a file to S3
function uploadResume(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };
  return s3.upload(uploadParams).promise();
}
exports.uploadResume = uploadResume;

function uploadCover(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };
  return s3.upload(uploadParams).promise();
}
exports.uploadCover = uploadCover;

// uploads an Invoice to S3
function uploadInvoice(invoice, pathToAttachment) {
  const fileStream = fs.createReadStream(pathToAttachment);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: `${invoice}.pdf`,
    contentType: "application.pdf",
  };

  return s3.upload(uploadParams).promise();
}
exports.uploadInvoice = uploadInvoice;
