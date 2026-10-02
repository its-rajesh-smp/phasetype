/** Serialises JSON-LD for a script tag, escaping `<` so the payload can't close the tag early. */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
