// module.exports = getPeriodIndexText = (shortTitle,title) => {
//   return `
// ---
// shortTitle: "${shortTitle}"
// title: "${title}"
// ---
  
// ${title}
// TBD: Add some additional details about this flow`.replace(/\n/g, "\r\n").trim();
// };

module.exports = getPeriodIndexText = (shortTitle,title,addBusComp) => {
  const extra =`
## Business competences 
TBD 
`.trim();
const  businessComp = addBusComp ? extra : "";
  return `
---
shortTitle: "${shortTitle}"
title: "${title}"
--- 
${title}

${businessComp}
`.replace(/\n/g, "\r\n").trim();
};