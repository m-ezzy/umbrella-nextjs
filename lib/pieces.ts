// transform logic for data transformation and cleaning pass in zod fields
export function transformerOfNull(value: any) {
  return value == "NULL" || "" ? null : value
}
