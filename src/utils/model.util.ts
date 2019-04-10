import { Sequelize } from 'sequelize-typescript';
import SequelizeOrigin from 'sequelize';

/**
 * Ensure given key belongs to T
 */
export function field<T>(key: keyof T) {
  return key;
}

/**
 * Ensure keys of given object belongs to T
 */
export function fields<T>(obj: Partial<{ [key in keyof T]: any }>) {
  return obj;
}

/**
 * Ensure given object is part of T
 */
export function partial<T>(obj: { [key in keyof T]?: T[key] | null }) {
  return obj;
}

/**
 * Format column name from join tables using sql server format
 */
export const getFieldForMssql = (table: string, column: string) =>
  `[${table}].[${column}]`;

/**
 * Format directly column name from join tables for sequelize attributes options using sql server format
 */
export const getFieldForAttribute = (
  fieldPath: string[],
  targetField: string,
  alias?: string,
  castAs?: string,
): [SequelizeOrigin.literal | SequelizeOrigin.cast, string] => {
  const formattedField = Sequelize.literal(
    getFieldForMssql(fieldPath.join('->'), targetField),
  );
  if (castAs)
    return [Sequelize.cast(formattedField, castAs), alias || targetField];
  return [formattedField, alias || targetField];
};

/**
 * Format where condition with like operator and force case and accent insensitive collation
 */
export const searchInsensitive = (
  fieldPath: string[],
  targetField: string,
  value: string,
) =>
  Sequelize.where(
    Sequelize.literal(
      `${getFieldForMssql(
        fieldPath.join('->'),
        targetField,
      )} COLLATE French_CI_AI`,
    ),
    'like',
    `%${value}%`,
  );
/**
 * Format directly column name from join tables for sequelize group options
 * Workaround since column name is wrong (. separator instead of ->) when putting all models in group params like in order property
 */
export const getFieldForGroup = (
  fieldPath: string[],
  targetField: string,
  castAs?: string,
) => {
  const col = Sequelize.col(`${fieldPath.join('->')}.${targetField}`);
  if (castAs) return Sequelize.cast(col, castAs);
  return col;
};
