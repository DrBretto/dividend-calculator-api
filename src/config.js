module.exports = {
  PORT: process.env.PORT || 5432,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgres://rhctdigfswduzo:ec288e0562eb6190e6d8f67ca937f48e15455ac81aba4c5ba3f969e6fc31737c@ec2-54-236-169-55.compute-1.amazonaws.com:5432/d4635lcrjnv0e8",
  JWT_SECRET: process.env.JWT_SECRET || "super-secret-secret",
};

// "dbname=d4635lcrjnv0e8 
//host=ec2-54-236-169-55.compute-1.amazonaws.com 
//port=5432 
//user=rhctdigfswduzo 
//password=ec288e0562eb6190e6d8f67ca937f48e15455ac81aba4c5ba3f969e6fc31737c sslmode=require" 

// module.exports = {
//   PORT: process.env.PORT || 5432,
//   NODE_ENV: process.env.NODE_ENV || "development",
//   DATABASE_URL:
//     process.env.DATABASE_URL ||
//     "postgresql://dunder_mifflin:8502@localhost/dividend",
//   JWT_SECRET: process.env.JWT_SECRET || "super-secret-secret",
// };
