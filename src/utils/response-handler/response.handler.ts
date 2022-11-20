import { Response } from 'express';

/** types */
type Status = 'success' | 'fail' | 'error';
type Data = Record<string, any> | null;
type JSendFormat = {
  status: Status;
  data: Data;
  message?: string;
};

type ResJson = (
  res: Response,
  statusCode: number | undefined,
  data: Data,
  msg?: string
) => void;

const getStatus = (statusCode: number): Status => {
  if (statusCode >= 200 && statusCode < 400) return 'success';
  if (statusCode >= 400 && statusCode < 500) return 'fail';
  return 'error';
};

export const resJson: ResJson = (res, statusCode = 500, data, message) => {
  const status = getStatus(statusCode);

  const resObj: JSendFormat = {
    status,
    message,
    data,
  };

  res.status(statusCode).json(resObj);
};
