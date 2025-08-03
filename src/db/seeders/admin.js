const { User } = require("../../models/User");

const seedAdmin = async () => {
  const admin = {
    name: "Admin",
    email: "admin@example.com",
    password: "123456",
    role: "admin",
  };

  await new User(admin).save();
};

module.exports = seedAdmin;
