module.exports = getWeekText = (fileName) => {
  return `
---
title: "TODO - ADD TITLE"
date: "${fileName}"
pageintro: |
  TODO - Add Some Text
---
         
### Before this lesson you should:
TBD
          
 ### Exercises
TBD
          
 ### Slides
TBD`
    .replace(/\n/g, "\r\n")
    .trim();
};
