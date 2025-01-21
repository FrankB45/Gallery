-- dbSetup.sql
-- This file is used to setup the database for the gallery application.

-- Create the database
DROP DATABASE IF EXISTS gallery;
CREATE DATABASE gallery;

-- Use the gallery database
\connect gallery_db

\i gallery_schema.sql
\i gallery_seed.sql

-- Setup the test database
DROP DATABASE IF EXISTS gallery_test;
CREATE DATABASE gallery_test;

-- Use the test database
\connect gallery_test

\i gallery_schema.sql



