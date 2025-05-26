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

const MONGODB_URI = process.env.MONGODB_URI as string;

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

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongoose: MongooseCache | undefined;
}

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

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