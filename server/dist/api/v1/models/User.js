"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var GenderEnum;
(function (GenderEnum) {
    GenderEnum["male"] = "male";
    GenderEnum["female"] = "female";
    GenderEnum["other"] = "other";
})(GenderEnum || (GenderEnum = {}));
var UserRoleEnum;
(function (UserRoleEnum) {
    UserRoleEnum["user"] = "user";
    UserRoleEnum["admin"] = "admin";
    UserRoleEnum["moderator"] = "moderator";
})(UserRoleEnum || (UserRoleEnum = {}));
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: [validator_1.default.isEmail, "Please provide a valid email"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        min: 6,
    },
    userFullName: {
        type: String,
        required: [true, "Full name is required"],
        unique: true,
        max: 100,
        min: 3,
    },
    age: {
        type: Number,
        min: 5,
    },
    gender: {
        type: String,
        enum: Object.values(GenderEnum),
    },
    profilePicture: {
        type: String,
        default: "",
    },
    coverPicture: {
        type: String,
        default: "",
    },
    followers: {
        type: [mongoose_1.Types.ObjectId],
        default: [],
    },
    followings: {
        type: [mongoose_1.Types.ObjectId],
        default: [],
    },
    userRole: {
        type: String,
        enum: Object.values(UserRoleEnum),
        default: UserRoleEnum.user,
    },
    bio: {
        type: String,
        max: 100,
    },
    city: {
        type: String,
        max: 50,
    },
    from: {
        type: String,
        max: 50,
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3],
    },
    otherSoialMedia: {
        type: [String],
        default: [],
    },
}, { timestamps: true });
// Hash the password before saving the user model
UserSchema.pre("save", async function (next) {
    const salt = await bcrypt_1.default.genSalt(10);
    this.password = await bcrypt_1.default.hash(this.password, salt);
    next();
});
// Compare the entered password to the hashed password in the database
UserSchema.methods.isValidPassword = async function (recievedPassword) {
    const isValid = await bcrypt_1.default.compare(recievedPassword, this.password);
    return isValid;
};
//Create a JWT token for the user
UserSchema.methods.generateAuthToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id, userRole: this.userRole }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
};
exports.default = (0, mongoose_1.model)("User", UserSchema);
//# sourceMappingURL=User.js.map