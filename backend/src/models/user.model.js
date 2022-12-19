const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { genSalt, hash, compare } = require('bcryptjs');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

userSchema.statics.hashPassword = async (receivedPassword) => {
    const salt = await genSalt(10);
    return await hash(receivedPassword, salt);
};

userSchema.statics.comparePassword = async (receivedPassword, password) => {
    return await compare(receivedPassword, password);
};

exports.userModel = mongoose.model("users", userSchema);
