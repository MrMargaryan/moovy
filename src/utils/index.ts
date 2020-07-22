export const pickProperties = (object: any, properties: string[]) => {
  return Object.assign({}, ...properties.map(property => ({ [property]: object[property] })))
}