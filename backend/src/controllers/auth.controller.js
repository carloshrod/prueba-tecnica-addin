const { userModel } = require("../models/user.model");
const { generateAuthToken } = require("../utils/generateAuthToken");

exports.signUp = async (req, res, next) => {
    try {
        const newUser = new userModel(req.body);
        newUser.password = await userModel.hashPassword(newUser.password);
        const savedUser = await newUser.save();
        const token = generateAuthToken(savedUser);
        const { username } = savedUser;
        return res.status(201).json({ token, username });
    } catch (error) {
        next(error);
    }
}

exports.login = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const foundUser = await userModel.findOne({ $or: [{ username }, { email }] });

        const areCredentialsOk = foundUser === null
            ? false
            : await userModel.comparePassword(password, foundUser.password);

        if (!areCredentialsOk) {
            return res.status(401).json({ msg: "Invalid credentials!" });
        }

        const token = generateAuthToken(foundUser);
        return res.status(200).json({ token, username });
    } catch (error) {
        next(error);
    }
};