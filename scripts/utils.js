/**
    * Converts title to a filename (not a full path)
    * @param {String} title The title to convert
  */
const titleToFilename = title => (
  title.toLowerCase()
    .replace(/[ !’]/g, "-")
);
const getDistSubFolder = category => !!category ? `${category}/` : '';

const getDistFilename = icon => {

  const dir = !!icon.category ? `${icon.category}/` : '';
  return `${dir}${titleToFilename(icon.title)}`;
};

module.exports = {
  titleToFilename,
  getDistSubFolder,
  getDistFilename
}
