/*


*/

// ======================================================================================================================
// ======================================================================================================================

// ➡️ ➡️ ➡️ TABELL MED D3.js ⬅️ ⬅️ ⬅️

// ======================================================================================================================
// ======================================================================================================================

// add ▼▲ to sortable column headers

// https://stackoverflow.com/questions/15121690/d3-seems-to-assume-i-know-the-column-names-of-a-csv

const columnIdentifier = {
  "Select":{"className":"select","headerName":"Select","fnutt":"","display":"","print":false},
  "Title":{"className":"title","headerName":"Title","fnutt":"▼▲","display":"none","print":true},

}


const columnTable = ["Select", "Title", "Abstract", "Type", "Author", "Year", "Title_Abstract", "Journal", "Series", "Published", "Volume", "Pages", "Date", "Keywords", "Language", "Notes"]
const printColumns = ["Title", "Abstract", "Type", "Record", "Author", "Year", "Journal", "Series", "Published", "Volume", "Pages", "Date", "Keywords", "Language", "Notes"]

function bookTable(dataset, columns) {

  let titleandabstractAscending = true
  let authorAscending = true
  // let titleAscending = true
  let journalAscending = true
  // let abstractAscending = true
  let typeAscending = true
  let yearAscending = true

  const table = d3.select("#table-wrapper")
    .append("table")
    .attr("class", "book-table")
    .attr("id", "book-table")
    // .attr("style", (d) => "display: none;") //Ketil: make complete table invisible
  thead = table.append("thead")
  tbody = table.append("tbody")
  thead.append("tr")
    .selectAll("th")
    .data(columns)
    .enter()
    .append("th")
    .attr("class", (column) =>
      column.toLowerCase()
    )
    .text((column) => column
  )
    .on("click", function(d) { // sortere kolonner ascending/descending

      // sorting on Title column (which is set to hidden) because if we sort on TitleandAbstract, the sorting
      // will be done in three bulks because of the construction of TitleandAbstract in the getData function
      if (d == "Title_Abstract") {
        if (titleandabstractAscending) {
          sortFunction = (a, b) => a.Title.localeCompare(b.Title)
          titleandabstractAscending = !titleandabstractAscending
        } else {
          sortFunction = (a, b) => b.Title.localeCompare(a.Title)
          titleandabstractAscending = !titleandabstractAscending
        }
      }

      if (d == "Author") {
        if (authorAscending) {
          sortFunction = (a, b) => a.Author.localeCompare(b.Author)
          authorAscending = !authorAscending
        } else {
          sortFunction = (a, b) => b.Author.localeCompare(a.Author)
          authorAscending = !authorAscending
        }
      }
      if (d == "Journal") {
        if (journalAscending) {
          sortFunction = (a, b) => a.Journal.localeCompare(b.Journal)
          journalAscending = !journalAscending
        } else {
          sortFunction = (a, b) => b.Journal.localeCompare(a.Journal)
          journalAscending = !journalAscending
        }
      }
      if (d == "Type") {
        if (typeAscending) {
          sortFunction = (a, b) => a.Type.localeCompare(b.Type)
          typeAscending = !typeAscending
        } else {
          sortFunction = (a, b) => b.Type.localeCompare(a.Type)
          typeAscending = !typeAscending
        }
      }
      if (d == "Year") {
        if (yearAscending) {
          sortFunction = (a, b) => a.Year.localeCompare(b.Year)
          yearAscending = !yearAscending
        } else {
          sortFunction = (a, b) => b.Year.localeCompare(a.Year)
          yearAscending = !yearAscending
        }
      }
      rows.sort(sortFunction)
    })

  // create a row for each object in the data
  const rows = tbody.selectAll("tr")
    .data(dataset)
    .enter()
    .append("tr")

  // create a cell in each row for each column
  const cells = rows.selectAll("td")

    .data(function(row) {
      return columns.map(function(column) {
        return {
          column: column,
          value: row[column]
        }
      })
    })
    .enter()
    .append("td")
    .attr("class", (d) =>
      d.column.toLowerCase()
    )
    .html((d) =>
      d.value
    )

  return table
}


// ======================================================================================================================
// ======================================================================================================================

// ➡️ ➡️ ➡️ PRINT SELECTED ⬅️ ⬅️ ⬅️

// ======================================================================================================================
// ======================================================================================================================


function printTable() {
  // var printwin = window.open('', 'PRINT', 'height=400,width=600');
  var printwin = window.open();
  printwin.document.write('<html><head><title>' + document.title + '</title>');
  printwin.document.write('</head><body>');

  //const table = document.getElementById("book-table").innerHTML;

  const checkBoxes = document.getElementsByClassName("checkbox");

  [].forEach.call(checkBoxes, function(box) {
    if (box.checked) {
      const row = box.parentElement.parentElement;
      printwin.document.write("<div style='margin-bottom:25px' >");
      [].forEach.call(row.cells, function(cell) {
        var className = cell.getAttribute("class").toLowerCase()
        className = className.charAt(0).toUpperCase() + className.slice(1);
        if (printColumns.includes(className)) {
          printwin.document.write("<p style='margin-bottom:0; margin-top:0;' ><b>" + className + ":</b>" + cell.textContent + "</p>");
        }
      })
      printwin.document.write("</div>")
    }
  })
  printwin.document.write('</body></html>');

  printwin.stop();
  printwin.print();
  printwin.close();
}


// ======================================================================================================================
// ======================================================================================================================

// ➡️ ➡️ ➡️ FRITEKST-SØK ALL COLUMNS ⬅️ ⬅️ ⬅️

// ======================================================================================================================
// ======================================================================================================================

function quickSearch(searchEntry) {
  const tables = document.getElementsByClassName("book-table")
  const searchValueNormalized = searchEntry.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const split = searchValueNormalized.split(" ");
  console.log(split);
  let foundElements = 0;

  [].forEach.call(tables, function(table) {
    [].forEach.call(table.tBodies, function(tbody) {
      [].forEach.call(tbody.rows, function(row) {
        if (row.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(searchValueNormalized) > -1) {
          row.style.display = ""
          foundElements = foundElements + 1;
        } else {
          row.style.display = "none"
        }
      })
    })
  })
  const table = document.getElementById("book-table");
  table.style.display = ""

  document.getElementById("entries").innerHTML = "Table entries: " + foundElements

}


// ======================================================================================================================
// ======================================================================================================================

// ➡️ ➡️ ➡️ FRITEKST-SØK ADVANCED - AUTHOR, TITLE, JOURNAL, ABSTRACT ⬅️ ⬅️ ⬅️

// ======================================================================================================================
// ======================================================================================================================


function advancedSearch() {
  let foundElements = 0;
  const authorValue = document.getElementById("author").value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  const titleValue = document.getElementById("title").value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  const journalValue = document.getElementById("journal").value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  const abstractValue = document.getElementById("abstract").value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  const keywordValue = document.getElementById("dropdownmenu-keyword").value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  const typeValue = document.getElementById("dropdownmenu-type").value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  const fromyearValue = +document.getElementById("dropdownmenu-fromyear").value
  const toyearValue = +document.getElementById("dropdownmenu-toyear").value

  const myDict = {}

  if (authorValue != "") {
    myDict["author"] = authorValue
  }
  if (titleValue != "") {
    myDict["title"] = titleValue
  }
  if (journalValue != "") {
    myDict["journal"] = journalValue
  }
  if (abstractValue != "") {
    myDict["abstract"] = abstractValue
  }
  if (keywordValue != "") {
    myDict["keywords"] = keywordValue
  }
  if (typeValue != "") {
    myDict["type"] = typeValue
  }
  if (fromyearValue != 0) {
    myDict["fromYear"] = fromyearValue
  }
  if (toyearValue != 0) {
    myDict["toYear"] = toyearValue
  }
  const tables = document.getElementsByClassName("book-table");

  [].forEach.call(tables, function(table) {
    [].forEach.call(table.tBodies, function(tbody) {
      [].forEach.call(tbody.rows, function(row) {
        showRow = true;
        [].forEach.call(row.cells, function(cell) {
          columnName = cell.getAttribute("class").toLowerCase()
          if (columnName in myDict) {
            const cellContentNormalized = cell.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            if (cellContentNormalized.indexOf(myDict[columnName]) > -1) {
              showRow = showRow && true
            } else {
              showRow = showRow && false
            }
          }
          if (columnName == "year") {
            yearValue = +cell.textContent
            if ("fromYear" in myDict) {
              if (yearValue >= myDict["fromYear"]) {
                showRow = showRow && true
              } else {
                showRow = showRow && false
              }
              console.log(yearValue, myDict["fromYear"], showRow)
            }
            if ("toYear" in myDict) {
              if (yearValue <= myDict["toYear"]) {
                showRow = showRow && true
              } else {
                showRow = showRow && false
              }
            }
          }
        });
        if (showRow == true) {
          row.style.display = ""
          foundElements = foundElements + 1;
        } else {
          row.style.display = "none"
        }
      });
    });
  });

  document.getElementById("entries").innerHTML = "Table entries: " + foundElements


  //Ketil: make complete table invisible
  //  const table = document.getElementById("book-table");
  // tables.style.display = "none";

}

// ======================================================================================================================
// ======================================================================================================================

// ➡️ ➡️ ➡️ RESET SØK MED KNAPP ⬅️ ⬅️ ⬅️

// ======================================================================================================================
// ======================================================================================================================

// id must be <form> for the .reset() method to work!
function resetSearch() {
  document.getElementById("search-wrapper").reset()
  let foundElements = 0
  const tables = document.getElementById("book-table");

  [].forEach.call(tables.tBodies, function(tbody) {
    [].forEach.call(tbody.rows, function(row) {
      row.style.display = ""
      foundElements = foundElements + 1;
    })
  })

  document.getElementById("entries").innerHTML = "Table entries: " + foundElements
  //reset check boxes
  const checkBoxes = document.getElementsByClassName("checkbox");
  [].forEach.call(checkBoxes, function(box) {
    box.checked = null;
  })
}

// ======================================================================================================================
// ======================================================================================================================

// ➡️ ➡️ ➡️ NEDTREKKSMENYAR  ⬅️ ⬅️ ⬅️

// ======================================================================================================================
// ======================================================================================================================

function buildDropDownMenus(dataset) {

  // ======================================================================================================================

  // ➡️ ➡️ ➡️  NEDTREKKSMENY KEYWORDS ⬅️ ⬅️ ⬅️

  // ======================================================================================================================

  let concatArraysKeywords = []
  let concatArraysType = []
  let concatArraysYear = []

  dataset.forEach(function(d) {

    const splitStringListKeyword = d.Keywords.split(",")
    concatArraysKeywords = concatArraysKeywords.concat(splitStringListKeyword)

    const splitStringListType = d.Type.split(",")
    concatArraysType = concatArraysType.concat(splitStringListType)

    const splitStringListYear = d.Year.split(",")
    concatArraysYear = concatArraysYear.concat(splitStringListYear)

  })

  // fjerne whitespace
  for (let i = 0; i < concatArraysKeywords.length; i++) {
    concatArraysKeywords[i] = concatArraysKeywords[i].trim()
  }
  // sortere alfabetisk
  const uniqueValues = [...new Set(concatArraysKeywords)].sort()
  let optionsKeywords = "<option value='' hidden>--select--</option>"

  for (const uniqueValue of uniqueValues) {
    optionsKeywords += `<option value='${uniqueValue}'>${uniqueValue}</option>`
  }

  const dropdownKeyword = document.getElementById("dropdownmenu-keyword")
  dropdownKeyword.innerHTML = optionsKeywords


  // ======================================================================================================================

  // ➡️ ➡️ ➡️  NEDTREKKSMENY TYPE ⬅️ ⬅️ ⬅️

  // ======================================================================================================================

  for (let i = 0; i < concatArraysType.length; i++) {
    concatArraysType[i] = concatArraysType[i].trim()
  }
  const uniqueValuesType = [...new Set(concatArraysType)].sort()
  let optionsType = "<option value='' hidden>--select--</option>"
  for (const uniqueValueType of uniqueValuesType) {
    optionsType += `<option value='${uniqueValueType}'>${uniqueValueType}</option>`
  }
  const dropdownType = document.getElementById("dropdownmenu-type")
  dropdownType.innerHTML = optionsType;


  // ======================================================================================================================

  // ➡️ ➡️ ➡️  NEDTREKKSMENY FROM YEAR ⬅️ ⬅️ ⬅️

  // ======================================================================================================================

  for (let i = 0; i < concatArraysYear.length; i++) {
    concatArraysYear[i] = concatArraysYear[i].trim()
  }
  let uniqueValuesFromYear = [...new Set(concatArraysYear)].sort()
  let optionsFromYear = "<option value='' hidden>--select--</option>"
  for (const uniqueValueFromYear of uniqueValuesFromYear) {
    optionsFromYear += `<option value='${uniqueValueFromYear}'>${uniqueValueFromYear}</option>`
  }
  const dropdownFromYear = document.getElementById("dropdownmenu-fromyear")
  dropdownFromYear.innerHTML = optionsFromYear;

  // ======================================================================================================================

  // ➡️ ➡️ ➡️  NEDTREKKSMENY TO YEAR ⬅️ ⬅️ ⬅️

  // ======================================================================================================================

  let uniqueValuesToYear = [...new Set(concatArraysYear)].sort()
  let optionsToYear = "<option value='' hidden>--select--</option>"
  for (const uniqueValueToYear of uniqueValuesToYear) {
    optionsToYear += `<option value='${uniqueValueToYear}'>${uniqueValueToYear}</option>`
  }
  const dropdownToYear = document.getElementById("dropdownmenu-toyear")
  dropdownToYear.innerHTML = optionsToYear

}

// ======================================================================================================================
// ======================================================================================================================

// ➡️ ➡️ ➡️ LES INN DATA. NEDTREKKSMENY & TABELL ⬅️ ⬅️ ⬅️

// ======================================================================================================================
// ======================================================================================================================

async function getData() {

  const dataset = await d3.dsv(";", "./data/POLAR-2.csv")

  dataset.forEach(function(d) {
    className = 'showAbstractLink'
    if (d.Abstract == "") {
      className = ''
    }
    d["Title_Abstract"] = "<p class=" + className + " onclick='expandAbstract(this)'>" + d.Title + "</p> " + "<p  class='abstractcontent' style='display: none;'>" + d.Abstract + "</p>"

    // add column with checkboxes

    d["Select"] = "<input type='checkbox' class='checkbox' ></input>"
  })
  console.log(dataset);
  buildDropDownMenus(dataset);
  //bookTable(dataset, ["Select", "Title", "Abstract", "Title_Abstract", "Type", "Record", "Author", "Year", "Journal", "Series", "Published", "Volume", "Pages", "Date", "Keywords", "Language", "Notes"])
  bookTable(dataset, columnTable)
  document.getElementById("entries").innerHTML = "Table entries: " + dataset.length
}

getData()


// ======================================================================================================================
// ======================================================================================================================

// ➡️ ➡️ ➡️ CHECKBOX FUNCTION ⬅️ ⬅️ ⬅️

// ======================================================================================================================
// ======================================================================================================================


function expandAbstract(element) {
  if (element.nextElementSibling.style.display == "") {
    element.nextElementSibling.style.display = "none";
  } else {
    element.nextElementSibling.style.display = "";
  }
}
