/**
    * Converts title to a filename (not a full path)
    * @param {String} name The file name to convert
  */

const getDistSubFolder = category => !!category ? `${category}/` : '';

const getDistFilename = icon => {

  const dir = !!icon.category ? `${icon.category}/` : '';
  return `${dir}${icon.name}`;
};

module.exports = {
  getDistSubFolder,
  getDistFilename
}
