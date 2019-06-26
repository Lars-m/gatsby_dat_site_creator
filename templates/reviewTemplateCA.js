module.exports = getReviewCaText = (fileName) => {
  return `
---
title: "Review of last weeks Course Assignment (CA)"
date: "${fileName} (RevCA)"
pageintro: |
  Online Review of last weeks Course Assignment (CA)
---
## Review of CA-X

Sign up for a timeslot here: **TBD**

Please note, this review will be online via **Zoom** (details will follow)

`.replace(/\n/g, "\r\n")
    .trim();
};