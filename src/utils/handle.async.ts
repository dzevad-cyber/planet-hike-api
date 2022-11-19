import {
  NextFunction as NextFn,
  Request as Req,
  RequestHandler,
  Response as Res,
} from 'express';

type Cb = (req: Req, res: Res, next: NextFn) => Promise<void>;

const handleAsync = (cb: Cb): RequestHandler => {
  return (req, res, next) => {
    return cb(req, res, next).catch(next);
  };
};

export default handleAsync;
