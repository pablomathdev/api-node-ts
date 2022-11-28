export default {
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/api',
  mongoUriTest: process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/test',
  port: process.env.PORT || 3000,
  JsonWebTokenSecret: process.env.JWT_SECRET || 'secretTest'
}
