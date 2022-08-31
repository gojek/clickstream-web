// @ts-check
export default class Id {
  /**
   * Gives a unique random v4 uuid
   *
   * @returns Unique random uuidv4 string
   */
  uuidv4() {
    return `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(
      /[018]/g,
      (/** @type any */ c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    )
  }
}
