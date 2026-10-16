function optionalHttpsUrl(name) {
  const value = process.env[name]?.trim();
  if (!value) return null;

  try {
    const url = new URL(value);
    if (url.protocol !== "https:") throw new Error("URL must use HTTPS");
    return url.href;
  } catch {
    console.warn(`${name} must be a valid HTTPS URL; that media will be omitted.`);
    return null;
  }
}

module.exports = {
  welcomeThumbnail: optionalHttpsUrl("WELCOME_THUMBNAIL_URL"),
  welcomeBanner: optionalHttpsUrl("WELCOME_BANNER_URL"),
  goodbyeThumbnail: optionalHttpsUrl("GOODBYE_THUMBNAIL_URL"),
  goodbyeBanner: optionalHttpsUrl("GOODBYE_BANNER_URL"),
  reporterThumbnail: optionalHttpsUrl("REPORTER_THUMBNAIL_URL"),
};
