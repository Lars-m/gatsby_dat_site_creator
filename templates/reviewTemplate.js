module.exports = retReviewText = (fileName) => {
  return `
---
title: "Review of last weeks topics"
date: "${fileName} (R)"
pageintro: |
  Follow up on last week, class presentations and an introduction to this week
---

## Class Presentations
Sign up on this list **TBD** (*remember you need to do at least one class presentation*)
### What we expect from you:
- A small presentation involving some of last weeks learn goals
- The presentation must involve a *class exercise*, either in the form of a Kahoot or 
"*three questions to the class*" which you would like to discuss. 

### What we will do
- Go through a selected exercise from last friday
- Introduce the topics for this new week
`.replace(/\n/g, "\r\n")
    .trim();
};
