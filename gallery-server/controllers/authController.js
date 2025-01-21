const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
require('dotenv').config();

const register = async (req, res) => {
    try {

        const {username, password} = req.body;

        const existingUser = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);

        //Check if user exists
        if(existingUser.rows.length > 0){
            return res.status(400).json({message: 'User already exists'});
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Insert user into database
        await pool.query(
            `INSERT INTO users (username, password, role) VALUES ($1, $2, 'user')`,
            [username, hashedPassword, role || 'user']
        );
        
        return res.status(201).json({message: 'User registered successfully'});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error registering user'});
    }
};

const login = async (req, res) => {
    try {
        const {username, password} = req.body;

        //Find user in database
        const user = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);

        if(!user){
            return res.status(401).json({message: 'Invalid username or password'});
        }

        //Check if password matches
        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if(!validPassword){
            return res.status(401).json({message: 'Invalid username or password'});
        }
        
        //Generate Token
        const token = jwt.sign({ id: user.rows[0].id, 
            username: user.rows[0].username, 
            role: user.rows[0].role }, process.env.JWT_SECRET, {expiresIn: '2h'});
        
        return res.status(200).json({message: 'Login successful', token});

    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Error logging in user'});
    }
};