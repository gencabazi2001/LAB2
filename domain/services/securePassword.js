const bcrypt = require("bcryptjs");

const securePassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 	salt);
    return hashedPassword;
};


const validPassword = async (bodypass,userpass) => { 
    const valid = await bcrypt.compare(bodypass, userpass);
    if (!valid)
        return false;
    return true;
}
module.exports = {securePassword, validPassword};