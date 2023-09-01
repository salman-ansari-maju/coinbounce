const authController = {
  async register(req, res, next) {
    //1. validate user input
    //2. if error in validation -> return error via middleware
    //3. if email or username is already registered -> return error
    //4. password hash
    //5. store user data in db
    //6. responce send
  },
  async login() {},
};

module.exports = authController;
