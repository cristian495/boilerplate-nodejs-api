const {
  connectVirtualMongo,
  disconnectVirtualMongo,
  cleanCollections,
} = require("./db");

const runVirtualMongoSetup = () => {
  beforeAll(async () => {
    await connectVirtualMongo();
  });

  afterAll(async () => {
    await disconnectVirtualMongo();
  });

  beforeEach(async () => {
    await cleanCollections();
  });
};

module.exports = { runVirtualMongoSetup };
