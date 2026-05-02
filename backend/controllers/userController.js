// Simple user controller
exports.getUsers = (req, res) => {
  const users = ['Alice', 'Bob', 'Charlie'];
  res.json(users);
};
