module.exports = {
  /**
    * Converts title to a filename (not a full path)
    * @param {String} title The title to convert
  */
  titleToFilename: title => (
    title.toLowerCase()
      .replace(/[ !’]/g, "")
  )
}
