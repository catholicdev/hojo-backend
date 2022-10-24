import { SelectQueryBuilder } from "typeorm";
import { isNil } from "lodash";

import { PaginationDto } from "@dto";

interface SearchByInterface {
  [key: string]: any;
}

export interface RangeOperator {
  gt?: any;
  lt?: any;
}

interface SearchByInRange {
  [key: string]: RangeOperator;
}

export interface PaginationInputData {
  searchBy?: SearchByInterface;
  searchByInRange?: SearchByInRange;
  paging?: PaginationDto;
}

interface PaginationQueryProps {
  query: SelectQueryBuilder<any>;
  searchBy?: SearchByInterface;
  inputData: PaginationInputData;
}

interface PaginationQueryWithPagingProps {
  query: SelectQueryBuilder<any>;
  searchBy?: SearchByInterface;
  paging: PaginationDto;
  inputData: {
    searchBy?: { [key: string]: any };
  };
}

const applyLimit = (query: SelectQueryBuilder<any>, paging: PaginationDto) => {
  if (paging && paging.pageIndex && paging.pageSize) {
    const skip = ((paging.pageIndex as number) - 1) * (paging.pageSize as number);
    const take = paging.pageSize;

    query.skip(skip);
    query.take(take);
  }
};

const applySearchBy = (searchBy: SearchByInterface, inputData: PaginationInputData, query: SelectQueryBuilder<any>) => {
  for (const key in inputData.searchBy) {
    const value = inputData.searchBy[key];

    // Checks if value is null or undefined.
    if (isNil(value) || !searchBy[key]) {
      continue;
    }

    let whereCondition = "";

    // search in multiple fields
    if (Array.isArray(value)) {
      const whereConditionArr: string[] = [];
      const parameters = {};

      value.forEach((oneValue, idx) => {
        whereConditionArr.push(`${searchBy[key]} LIKE :q${key}${idx}`);
        parameters[`q${key}${idx}`] = typeof oneValue !== "boolean" ? `%${oneValue}%` : oneValue;
      });

      whereCondition = `(${whereConditionArr.join(" OR ")})`;
      query.andWhere(`${whereCondition}`, parameters);
    } else {
      // search in one field
      whereCondition = `${searchBy[key]} LIKE :q${key}`;

      query.andWhere(`${whereCondition}`, {
        [`q${key}`]: typeof value !== "boolean" ? `%${value}%` : value,
      });
    }
  }
};

const applySearchByInRange = (
  searchBy: SearchByInterface,
  inputData: PaginationInputData,
  query: SelectQueryBuilder<any>
) => {
  for (const key in inputData.searchByInRange) {
    const value = inputData.searchByInRange[key];
    const searchByField = searchBy[key];

    if (isNil(value) || !searchBy[key]) {
      continue;
    }

    if (value.gt) {
      query.andWhere(`${searchByField} >= :gt`, {
        gt: value.gt,
      });
    }
    if (value.lt) {
      query.andWhere(`${searchByField} <= :lt`, {
        lt: value.lt,
      });
    }
  }
};

export const paginationQuery = ({ query, searchBy, inputData }: PaginationQueryProps) => {
  applyLimit(query, inputData.paging);

  if (!inputData) {
    return query;
  }

  if (inputData.searchBy) {
    applySearchBy(searchBy, inputData, query);
  }

  if (inputData.searchByInRange) {
    applySearchByInRange(searchBy, inputData, query);
  }

  return query;
};

export const paginationQueryWithPaging = ({ query, searchBy, paging, inputData }: PaginationQueryWithPagingProps) => {
  // limit, offset
  applyLimit(query, paging);

  if (!inputData || !inputData.searchBy) {
    return query;
  }

  // add search fields to query
  for (const key in inputData.searchBy) {
    const value = inputData.searchBy[key];

    // Checks if value is null or undefined.
    if (isNil(value) || !searchBy[key]) {
      continue;
    }

    let whereCondition = "";

    // search in multiple fields
    if (Array.isArray(value)) {
      const whereConditionArr: string[] = [];
      const parammeters = {};

      value.forEach((oneValue, idx) => {
        whereConditionArr.push(`${searchBy[key]} LIKE :q${key}${idx}`);
        parammeters[`q${key}${idx}`] = `%${oneValue}%`;
      });

      whereCondition = `(${whereConditionArr.join(" OR ")})`;
      query.andWhere(`${whereCondition}`, parammeters);
    } else {
      // search in one field
      whereCondition = `${searchBy[key]} LIKE :q${key}`;

      query.andWhere(`${whereCondition}`, {
        [`q${key}`]: `%${value}%`,
      });
    }
  }

  return query;
};
