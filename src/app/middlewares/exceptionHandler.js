import Youch from 'youch';

export default async (err, req, res, next) => {
  const errors = await new Youch(err, req).toJSON();

  return res.status(500).json(errors);
};
