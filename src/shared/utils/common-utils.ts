import { MatchQuery } from '../enums/common-enums';

export const capitalizeFirstLetter = (value: string) => {
  const capitalizeValue = value[0].toUpperCase();

  return capitalizeValue + value.slice(1);
};

export const isDateInRange = (
  startDate: Date,
  matchQuery: MatchQuery,
  optionalDate?: Date,
) => {
  const endDate = optionalDate ? optionalDate : startDate;

  matchQuery.createdAt = {
    $gte: new Date(startDate),
    $lt: new Date(new Date(endDate).getTime() + 24 * 60 * 60 * 1000),
  };
};
