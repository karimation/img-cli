const got = require("got");
const imageType = require("image-type");

const isURL = (url) => {
  // eslint-disable-next-line
  const pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  return pattern.test(url);
};
const imageBuffer = async (url) => {
  if (!(url && isURL(url))) {
    return null;
  } //throw new TypeError('A valid url is required')
  let response;
  let buffer;
  try {
    response = await got(url, { encoding: null });
  } catch (error) {
    return null;
  }
  try {
    buffer = Buffer.from(response.body, "binary");
  } catch (e) {
    return null;
  }
  const type = imageType(buffer);
  if (!type) return null;
  return buffer;
};

module.exports = { imageBuffer };
