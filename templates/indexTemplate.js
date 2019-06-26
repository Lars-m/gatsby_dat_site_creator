module.exports = getPeriodIndexText = (shortTitle,title) => {
  return `
---
shortTitle: "${shortTitle}"
title: "${title}"
---
  
${title}
TBD: Add some additional details about this flow`.replace(/\n/g, "\r\n").trim();
};