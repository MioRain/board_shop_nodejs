
const imgur = require('imgur')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
imgur.setClientId(IMGUR_CLIENT_ID)

const imgurFileHandler = async (file) => {
  try {
    if (!file) return null
    const img = await imgur.uploadFile(file.path)
    return img?.link || null
  } catch (err) {
    return err
  }
}

module.exports = {
  imgurFileHandler
}