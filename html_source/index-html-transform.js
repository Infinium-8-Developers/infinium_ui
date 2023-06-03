module.exports = (targetOptions, indexHtmlContent) => {
  indexHtmlContent = indexHtmlContent
    .toString()
    .replace(/type="module"/gm, 'defer');
  return indexHtmlContent;
};
