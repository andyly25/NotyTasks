// maybe my POST did not work because there wasn't a db to store files
'use strict';

// exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/blogpost-app';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/notytask';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost:27017/test-notytask';
exports.PORT = process.env.PORT || 8080;

// Auth things
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
