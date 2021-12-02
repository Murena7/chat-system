import { Response } from 'express';

const checkAuth = (roles?: string[]) => {
  return (req, res: Response, next) => {
    const message = 'Unauthorized';
    if (!req.isAuthenticated()) {
      return res.status(401).send({ message });
    }

    return next();
  };
};

export default checkAuth;
