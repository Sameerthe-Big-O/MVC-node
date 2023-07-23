const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;

    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    const foundUser = usersDB.users.find(person => person.username === user);
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    console.log(foundUser);
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {

        const token = jwt.sign({ 'username': foundUser.username }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '60s'
        });

        const refreshToken = jwt.sign({ 'username': foundUser.username }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '3h'
        });

        //!Saving the refresh tokens
        const otherUser = usersDB.users.filter(person => person.username !== foundUser.username);

        const currentUser = { ...foundUser, refreshToken };

        usersDB.setUsers([...otherUser, currentUser]);

        await fs.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );



        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ token });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };



//*try to stoer the access token in the memory instead the local storeage because it'll access by the hacker


//*the way we can make the refresh token not vunrable is that by sending them as cookies as the only http this is the cookie will not be access by the javascript