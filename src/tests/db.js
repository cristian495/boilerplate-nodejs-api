const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const connectVirtualMongo = async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
};

const disconnectVirtualMongo = async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
};

const cleanCollections = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};

module.exports = {
  connectVirtualMongo,
  disconnectVirtualMongo,
  cleanCollections,
};
