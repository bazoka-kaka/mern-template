const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const roles = [...allowedRoles];
    console.log(roles, req.roles);
    const result = req.roles
      ?.map((role) => roles?.indexOf(role) !== -1)
      .find((val) => val === true);
    if (!result) return res.sendStatus(403);
    next();
  };
};

module.exports = verifyRoles;
