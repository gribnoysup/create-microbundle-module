/* eslint-disable */

export default async function myModule() {
  const result = await Promise.resolve(123);
  return result.toString();
}
