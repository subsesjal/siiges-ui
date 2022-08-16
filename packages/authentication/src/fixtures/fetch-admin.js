const usersRole = require('./users-rols.json');

const fetchRolesFake = {
  getAll: () => Object.values(usersRole),
  getOne: (role) => usersRole[role],
};

const fetchLoginFake = {
  returnTrue: () => true, // TODO use authorization headers instead
  returnFalse: () => false,
};

exports = {
  fetchRolesFake,
  fetchLoginFake,
};
