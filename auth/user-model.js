const db = require("../database/dbConfig");

const createUser = user => {
  return db("users")
    .insert(user)
    .then(ids => findUserById(ids[0]));
};

const findUserById = id => {
  return db("users")
    .select("username")
    .where({ id })
    .first()
    .then(user => user);
};

const findUserByUsername = username => {
  return db("users")
    .where({ username })
    .first()
    .then(user => user);
};

module.exports = {
  createUser,
  findUserById,
  findUserByUsername
};
