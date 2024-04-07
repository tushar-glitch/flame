const client = require('../db/conn')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const registerQuery = "insert into users (username, age, email, password, fname, lname, created_at) values ($1, $2, $3, $4, $5, $6, now())"
const loginQuery = "select * from users where username = $1"
const flameQuery = "insert into flame (userId, blitzRating, rapidRating, classicalRating, rank) values ($1, $2, $3, $4, $5)"
const getFlameQuery = "select * from flame where userid = $1"
const register = async (req, res) => {
    const { username, age, email, fname, lname, password } = req.body
    try {
        if (username && age && email && fname && lname && password) {
            const hashedPass = await bcrypt.hash(password, 10);
            client.query(registerQuery, [username, age, email, hashedPass, fname, lname], async(err, response) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ msg: "Server Error" });
                }
                const userData = await client.query('select * from users where username = $1', [username])
                const userId = userData.rows[0].id
                client.query(flameQuery, [userId, 1200, 1200, 1200, 1], (err, resp) => {
                    if (err) throw err;
                })
                return res.status(200).json({ msg: "User registered" });
            })
        }
        else {
            return res.status(400).json({ msg: "Please enter all fields" });
        
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server Error" });
    }
}

const login = async (req, res) => {
    const { username, password } = req.body
    try {
        if (username && password) {
            client.query(loginQuery, [username], async(err, response) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ msg: "Server Error" });
                }
                if (response.rows.length === 0) {
                    return res.status(400).json({ msg: "User not found" });
                }
                const user = response.rows[0];
                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    return res.status(400).json({ msg: "Invalid credentials" });
                }
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
                const flameDetails = await client.query(getFlameQuery, [user.id])
                return res.status(200).json({ token, userDetails: user, flameDetails: flameDetails.rows });
            })
        }
        else {
            return res.status(400).json({ msg: "Please enter all fields" });
        
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server Error" });
    }
}

module.exports = {
    register,
    login
};