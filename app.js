const path = require("path");
const settings = require("./project.json");
const simpleGit = require("simple-git")();
const fs = require("fs");
const getWeekText = require("./templates/weekTemplate");
const getSpText = require("./templates/spTemplate");
const getIndexText = require("./templates/indexTemplate");
const getReviewText = require("./templates/reviewTemplate");
const getCaReviewText = require("./templates/reviewTemplateCA");
const {
  getLastPartOfPath,
  getDkStringFromDate,
  getDateFromDkDate
} = require("./utils");

console.log("Path", path.join(`../${settings.projectFolder}`));
console.log("git-repo", settings.gitRepo);

if (process.argv.length != 3) {
  return console.error(
    "No argument provided. Use one of: clone | makesemester | both"
  );
}
const argument = process.argv[2];
try {
  if (
    !(
      argument === "clone" ||
      argument === "makesemester" ||
      argument === "both"
    )
  ) {
    return console.error(
      "Argument must be one of: clone | makesemester | both"
    );
  }
  if (argument === "clone" || argument === "both") {
    simpleGit.clone(settings.gitRepo, `${settings.projectFolder}`, err => {
      if (err) {
        return console.error("Failed to clone ${settings.gitRepo}", err);
      }
      if (argument === "both") {
        makeFoldersAndFiles();
      }
    });
  }
  if(argument === "makesemester"){
    makeFoldersAndFiles();
  }
} catch (err) {
  console.error("Something when wrong", err.message);
}
function makeFoldersAndFiles() {
  let spCount = 1;
  const pagesFolder = path.join(settings.projectFolder, "src", "pages");
  if (!fs.existsSync(pagesFolder)) {
    return console.error(`Folder ${pagesFolder} does not exist`);
  }
  settings.periods.forEach(p => {
    const periodFolder = path.join(pagesFolder, p.period);
    if (fs.existsSync(periodFolder)) {
      throw new Error(`Folder ${periodFolder} already exists (delete manually to continue)`);
    }
    fs.mkdirSync(periodFolder);
    const period = getLastPartOfPath(periodFolder);

    const periodIndexText = getIndexText(period, "TODO - ADD TITLE");
    fs.writeFileSync(path.join(periodFolder, "index.md"), periodIndexText);

    p.weeks.forEach((w, weekIndex) => {
      const weekFolder = path.join(periodFolder, w.week);
      fs.mkdirSync(weekFolder);
      const week = getLastPartOfPath(weekFolder);
      let weekAddjusted = w.extra ? week + ` ${w.extra}` : week;
      const title = w.title ? w.title : "TODO - ADD TITLE";
      const weekIndexText = getIndexText(weekAddjusted, title);
      fs.writeFileSync(path.join(weekFolder, "index.md"), weekIndexText);

      let date = null;
      if (w.days) {
        if (w.startDate) {
          date = getDateFromDkDate(w.startDate);
        }
        for (let i = 1; i <= w.days; i++) {
          let fileName = date != null ? getDkStringFromDate(date) : `Day-${i}`;
          let txt = getWeekText(fileName);

          if (w.reviewDay && w.reviewDay === fileName) {
            //If first week in period, assume this is a review for a CA
            txt =
              weekIndex === 0
                ? getCaReviewText(fileName)
                : getReviewText(fileName);
          }

          fs.writeFileSync(path.join(weekFolder, `${fileName}.md`), txt, {
            encoding: "utf8"
          });
          if (date) {
            date.setDate(date.getDate() + 1);
          }
        }
      }
      if (w.addSpEx) {
        let dateStr = w.week;
        if (date != null) {
          dateStr = getDkStringFromDate(date);
          date.setDate(date.getDate() + 1);
        }
        const spTxt = getSpText(spCount, dateStr, period, week);
        fs.writeFileSync(path.join(weekFolder, `SP${spCount++}.md`), spTxt);
      }
    });
  });
}
