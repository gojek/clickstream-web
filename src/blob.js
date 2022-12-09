export const readAsBuffer = async (blob) => {
  if (blob.arrayBuffer) {
    return await blob.arrayBuffer()
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      if (reader.readyState === 2) {
        return resolve(reader.result)
      }
    }
    reader.onerror = (err) => reject(err)

    reader.readAsArrayBuffer(blob)
  })
}
