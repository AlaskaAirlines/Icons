/**
    * Converts title to a filename (not a full path)
    * @param {String} title The title to convert
  */
const titleToFilename = title => (
  title.toLowerCase()
    .replace(/[ !’]/g, "-")
);
const getDistSubFolder = type => !!type ? `${type}/` : '';

const getDistFilename = icon => {

  const dir = !!icon.type ? `${icon.type}/` : '';
  return `${dir}${titleToFilename(icon.title)}`;
};

module.exports = {
  titleToFilename,
  getDistSubFolder,
  getDistFilename
}
