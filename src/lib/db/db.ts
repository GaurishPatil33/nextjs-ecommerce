// import mongoose from "mongoose";

// const mongo = process.env.MONGODB_URI as string

// if (!mongo) throw new Error("please define mongodb_uri")

// let cached = (global as any).mongoose || { conn: null, promise: null }


// export async function connDb() {

//     if (cached.conn) return cached.conn

//     if (!cached.promise) {
//         cached.promise = mongoose.connect(mongo, {
//             bufferCommands: false
//         })
//     }

//     cached.conn = await cached.promise;
//     (global as any).mongoose = cached;
//     return cached.con
// }


// lib/mongodb.js
import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI as string;

// if (!MONGODB_URI) {
//     throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
// }

// let cached = (global as any).mongoose || { conn: null, promise: null };

// if (!cached) {
//     cached = { conn: null, promise: null };
// }

// export async function connectToDatabase() {
//     console.log(cached)
//     if (cached.conn) return cached.conn;

//     if (!cached.promise) {
//         cached.promise = mongoose.connect(MONGODB_URI, {
//             bufferCommands: false,
//         });
//     }
//     cached.conn = await cached.promise;
//     return cached.conn;
// }


const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Type definition for the cached connection
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// ✅ Declare the global variable properly with `let` and `const`
declare global {
  // eslint-disable-next-line no-var
  let mongoose: MongooseCache | undefined;
}

// ✅ Use `let` for global and `const` for cached if not reassigned
const globalWithMongoose = global as typeof globalThis & { mongoose: MongooseCache };

const cached: MongooseCache = globalWithMongoose.mongoose ?? { conn: null, promise: null };

globalWithMongoose.mongoose = cached;

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
