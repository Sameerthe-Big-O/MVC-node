const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();


const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(403); //Unauthorized 
    // evaluate jwt
    console.log(foundUser);

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    console.log(decoded);
    if (!decoded) {
        return res.sendStatus(403);
    }

    const accessToken = jwt.sign(
        {
            "username": decoded.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "2m"
        }
    );

    res.json({ accessToken })

}

module.exports = { handleRefreshToken };



//*try to stoer the access token in the memory instead the local storeage because it'll access by the hacker


//*the way we can make the refresh token not vunrable is that by sending them as cookies as the only http this is the cookie will not be access by the javascript



//*the cookie is get sent everytime remember this we don't need to manually send the jwt token,the jwt cookie will get send everytime fri the domain that's associated with


//*so whenever the refresh token gets hits it returns the new access token right and the thing is that we don't really need to send the cookie because it'll automatically get's send from the associated domain


//*the reason we send the cookie as the http only basically to make the thing more secure

//*lastly the refresh tok basically allows us to have longer connection without being constantly login so 💛 

