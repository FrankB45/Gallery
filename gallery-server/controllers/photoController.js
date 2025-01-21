const pool = require('../db');
const fs = require('fs');
const path = require('path');

const getStarredPhotos = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM photos WHERE starred = TRUE`);
        res.status(200).json(result.rows);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error getting starred photos'});
    }
};

const getAllPhotos = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM photos`);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error getting all photos'});
    }
};

const uploadPhoto = async (req, res) => {
    try {
        const file = req.file;
        //For Now Metadata is put in manually
        //Would like to pull from actual photo in the future
        const { date, cameraInfo, gpsLat, gpsLong } = req.body;

        if(!file){
            return res.status(400).json({message: 'No file uploaded'});
        }

        const filePath = file.filename;

        const result = await pool.query(
            `INSERT INTO photos (file_path, date, camera_info, gps_lat, gps_lon)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [filePath, date|| '', cameraInfo || '', gpsLat || null, gpsLong || null]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error uploading photo'});
    }
};

const updatePhoto = async (req, res) => {
    try {
        const { id } = req.params;
        const { starred, date, cameraInfo, gpsLat, gpsLon } = req.body;

        const result = await pool.query(
            `UPDATE photos SET starred = COALESCE($1, starred), 
            date = COALESCE($2, date), 
            camera_info = COALESCE($3, camera_info), 
            gps_lat = COALESCE($4, gps_lat), 
            gps_lon = COALESCE($5, gps_lon) WHERE id = $6`,
            [starred || null, date || null, cameraInfo || null, gpsLat || null, gpsLon || null, id]
        );

        if(result.rowCount === 0){
            return res.status(404).json({message: 'Photo not found'});
        }

        res.json(result.rows[0]);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error updating photo'});
    }
};

const getPhotoFile = (req, res) => {
    try {
        const { filename } = req.params;
        const filePath = path.join(__dirname, '../uploads', filename);
        if(!fs.existsSync(filePath)){
            return res.status(404).json({message: 'Photo not found'});
        }
        res.sendFile(filePath);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error getting photo file'});
    }
};

module.exports = {
    getStarredPhotos,
    getAllPhotos,
    uploadPhoto,
    updatePhoto,
    getPhotoFile
};