import mongoose from "mongoose";

console.log("🔍 MONGODB_URI:", process.env.MONGODB_URI); // Debugging line

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is missing in .env.local");
}

let cached = global.mongoose || { conn: null, promise: null };
  
export async function connectToDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    console.log("🔄 Connecting to MongoDB...");
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => {
      console.log("✅ MongoDB Connected!");
      return mongoose;
    });

    cached.conn = await cached.promise;
  }

  return cached.conn;
}
