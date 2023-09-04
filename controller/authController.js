const Joi = require("joi");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const UserDTO = require("../dto/user");

const authController = {
  async register(req, res, next) {
    //1. validate user input
    const userRegisterSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      name: Joi.string().max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.ref("password"),
    });

    const { error } = userRegisterSchema.validate(req.body);

    //2. if error in validation -> return error via middleware

    if (error) {
      return next(error);
    }

    //3. if email or username is already registered -> return error

    const { username, name, email, password } = req.body;

    try {
      const emailInUse = await User.exists({ email });
      const usenameInUse = await User.exists({ username });
      if (emailInUse) {
        const error = {
          status: 409,
          message: "Email already registered , use another email",
        };
        return next(error);
      }

      if (usenameInUse) {
        const error = {
          status: 409,
          message: " User name already registered use another user name",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }

    //4. password hash
    const hashedPassword = await bcrypt.hash(password, 10);
    //5. store user data in db
    const userToRegister = new User({
      username,
      email,
      name,
      password: hashedPassword,
    });

    const user = await userToRegister.save();

    //6. responce send
    const userdto = new UserDTO(user);
    return res.status(201).json({ userdto });
  },
  async login(req, res, next) {
    // validating user input

    // we expect data to be in this shape
    const userLoginSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      password: Joi.string().required(),
    });

    const { error } = userLoginSchema.validate(req.body);

    if (error) {
      return next(error);
    }
    let user;
    // find user from Db
    const { username, password } = req.body;
    try {
      user = await User.findOne({ username });
      if (!user) {
        const error = {
          status: 401,
          message: "Invalid user name",
        };
        return next(error);
      }

      // match password
      // req.body .password
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        const error = {
          status: 401,
          message: "Invalid password",
        };

        return next(error);
      }
    } catch (error) {
      return next(error);
    }
    const userDto = new UserDTO(user);
    return res.status(200).json({ userDto });
  },
};

module.exports = authController;
