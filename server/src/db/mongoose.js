import mongoose from "mongoose"

mongoose.connect(process.env.MONGODB_URI)

// "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" --dbpath="c:\data\db"