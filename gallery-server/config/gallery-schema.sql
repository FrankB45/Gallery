-- Create 'users' table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(10) NOT NULL DEFAULT 'user'
);

-- Create 'photos' table
CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY,
  file_path TEXT NOT NULL,
  starred BOOLEAN DEFAULT FALSE,
  date VARCHAR(50),
  camera_info VARCHAR(255),
  gps_lat DOUBLE PRECISION,
  gps_lon DOUBLE PRECISION
);