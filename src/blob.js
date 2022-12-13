/**
 * Returns a promise that resolves with the content of a blob as an ArrayBuffer
 *
 * @param {Blob} blob blob content
 * @returns {Promise}
 */
export const readAsBuffer = async (blob) => {
  if (blob.arrayBuffer) {
    return blob.arrayBuffer()
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readyState
      if (reader.readyState === 2) {
        resolve(reader.result)
      }
    }
    reader.onerror = (err) => reject(err)

    reader.readAsArrayBuffer(blob)
  })
}
