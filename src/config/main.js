module.exports = {
    port: process.env.PORT || 3000,
    mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/note_management',
    evn: process.env.NODE_ENV || 'development',
}