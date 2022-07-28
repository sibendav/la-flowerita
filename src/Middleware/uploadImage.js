const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const dbConfig = require("../config/db");
const MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
// const uri = "mongodb+srv://tratzon:tratzon1@cluster0.l39y0.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri);

var storage = new GridFsStorage({
  url: dbConfig.url + dbConfig.database,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png"];
    // console.log(file);
    return {
      bucketName: dbConfig.collectionUsers,
      filename: file.originalname + Date.now(),
    };
  },
});
var uploadFiles = multer({storage: multer.memoryStorage()}).single("file")
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports.uploadFile = uploadFilesMiddleware;


