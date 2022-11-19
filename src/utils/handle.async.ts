import {
  NextFunction as NextFn,
  Request as Req,
  RequestHandler,
  Response as Res,
} from 'express';

type Cb = (req: Req, res: Res, next: NextFn) => Promise<void>;
type HandleAsync = (cb: Cb) => RequestHandler;

const handleAsync: HandleAsync = (cb: Cb): RequestHandler => {
  return (req, res, next) => cb(req, res, next).catch(next);
};

export default handleAsync;
