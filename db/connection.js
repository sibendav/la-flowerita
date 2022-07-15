// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://tratzon:tratzon1@cluster0.l39y0.mongodb.net/FlowersShop?retryWrites=true&w=majority";
// const client = new MongoClient(uri, 
//     { useNewUrlParser: true, 
//       useUnifiedTopology: true
//     },  () => {
//         console.log('Connected to MongoDB');
//       });

// var _db;

// module.exports = {
//     connectToServer: function (callback) {
//         client.connect(function (err, db) {
//             // Verify we got a good "db" object
//             if (db) {
//                 _db = db.db("FlowersShop");
//                 console.log("Successfully connected to MongoDB.");
//             }
//             return callback(err);
//         });
//     },
//     getDb: function () {
//         return _db;
//     },
//     closeDb: function(){
//         client.close();
//     }
// };