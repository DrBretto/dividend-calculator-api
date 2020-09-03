module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://dunder_mifflin:8502@localhost/dividend",
  JWT_SECRET: process.env.JWT_SECRET || "super-secret-secret",
};
