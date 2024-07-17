const sql = require('../../config/db/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY =
    'c36o1jLAL83FDmlqZ/G/2lHu1EEc60cc8/KaPaBFC8mYHlsrDnrtOMFwDGPguNYnmPjX76SD9ly6LcpWZwfwQK46TFTmhVJqX3Lig2SWdkHrck0rNUU72RvG7X2Z42AbOB2dMTKxQFUOWKAg/T/XGq4YoOHyURFbGugCa25nUicOCj1AsK4rGMSkBPPwBcoDvPnUrbO8aQBsOG8wEyuq1UaODaSEBrWrjg8T7nBWKEubDqNVF5XNaUnUIbIVuh0Cvf7D/NQFj8EePi5MfOCeeYhfpHA3Hv2eN5oQMybeZ37kxL4tbqptirMy5nW/15nq4pF44uijdKXCxjuAi8j65Q==y';

class SiteController {
    // [POST] /register
    async register(req, res) {
        const { surname, name, account, password, dateOfBirth, gender } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const request = new sql.Request();
            request.input('name', sql.NVarChar, name);
            request.input('surname', sql.NVarChar, surname);
            request.input('account', sql.NVarChar, account);
            request.input('password', sql.NVarChar, hashedPassword);
            request.input('dateOfBirth', sql.Date, dateOfBirth);
            request.input('gender', sql.NVarChar, gender);
            await request.query(`
                    INSERT INTO Users (name, surname, account, password, dateOfBirth, gender)
                    VALUES (@name, @surname, @account, @password, @dateOfBirth, @gender)
                `);

            res.status(201).send('User registered successfully');
        } catch (err) {
            console.error('Error registering user:', err);
            res.status(500).send('Error registering user');
        }
    }
    // [POST] /login
    async login(req, res) {
        const { account, password } = req.body;
        try {
            const request = new sql.Request();
            request.input('account', sql.VarChar, account);
            const result = await request.query('SELECT * FROM Users WHERE account = @account');

            if (result.recordset.length === 0) {
                return res.status(400).send('User not found');
            }

            const user = result.recordset[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(400).send('Invalid password');
            }
            const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
            res.send({ token });
            console.log(token);
        } catch (error) {
            res.status(500).send('Error logging in');
        }
    }
}
module.exports = new SiteController();
