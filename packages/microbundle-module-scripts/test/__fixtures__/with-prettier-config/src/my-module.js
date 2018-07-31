/* eslint-disable */

export default async function myModule() {
  return [...(await Promise.resolve([1, 2, 3]))];
}
