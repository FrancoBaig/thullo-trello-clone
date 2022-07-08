require("dotenv").config();

module.exports = {
    env: {
        ACCESS = process.env.REACT_APP_ACCESS,
        SECRET = process.env.REACT_APP_SECRET
    },
}