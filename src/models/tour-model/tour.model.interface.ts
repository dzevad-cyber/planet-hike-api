import { Types } from 'mongoose';

export default interface ITour {
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  price: number;
  summary: string;
  imageCover: string;
  slug?: string;
  ratingsAverage?: number;
  priceDiscount?: number;
  description?: string;
  images?: Types.Array<string>;
  startDates?: Types.Array<Date>;
  secretTour?: boolean;
  ratingsQuantity?: number;
}
