const path = require("path")
module.exports = getSpText = (spNumber,dkDateStr,period,week) => {
  
  // const weekAsArray = weekFolder.split(path.sep);
  // const week = weekAsArray[weekAsArray.length-1];
  return `
---
title: "ADD TITLE"
date : 'SP${spNumber} (${dkDateStr})'
isSP: true
---
<!-- REMOVE ME: Setting isSP ensures this pages gets added to the list of Studypoint exercises -->

## Part-1 Complete all exercises (according to your colour level) from this week

<!-- REMOVE ME: The tag below will insert all day-exercises given for this week -->
<!-- REMOVE ME: PeriodFolder and weekFolder MUST match the real folder names -->

<!--PeriodExercises ${period}/${week} PeriodExercises--> 

## Part-2 XXXXX`.replace(/\n/g, "\r\n").trim();
}