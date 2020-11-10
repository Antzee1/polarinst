
/*

// DROPDOWN MENUS 
  if (dropdownFromYear.innerHTML = "") {
      // don't display the row ?
}

*/

// ======================================================================================================================
// ======================================================================================================================

// ➡️ ➡️ ➡️ TABELL MED D3.js ⬅️ ⬅️ ⬅️

// ======================================================================================================================
// ======================================================================================================================

function bookTable(dataset, columns) {

  let authorAscending = true
  let titleAscending = true
  let journalAscending = true
  let abstractAscending = true
  let typeAscending = true
  let yearAscending = true

  const table = d3.select("#table-wrapper")
    .append("table")
    .attr("class", "book-table")
    .attr("id", "book-table")
  thead = table.append("thead")
  tbody = table.append("tbody")
  thead.append("tr")
    .selectAll("th")
    .data(columns)
    .enter()
    .append("th")

    // old
    // .text(function(column) {
    //   return column
    // })
    //new
    .text((column) => column)

    // .on("click", function(d) { // sortere kolonner ascending/descending
    //
    //   if (d == "Author") {
    //     if (authorAscending) {
    //       sortFunction = function(a, b) {
    //         return a.Author.localeCompare(b.Author)
    //       }
    //       authorAscending = !authorAscending
    //     } else {
    //       sortFunction = function(a, b) {
    //         return b.Author.localeCompare(a.Author)
    //       }
    //       authorAscending = !authorAscending
    //     }
    //   }
    //   if (d == "Title") {
    //     if (titleAscending) {
    //       sortFunction = function(a, b) {
    //         return a.Title.localeCompare(b.Title)
    //       }
    //       titleAscending = !titleAscending
    //     } else {
    //       sortFunction = function(a, b) {
    //         return b.Title.localeCompare(a.Title)
    //       }
    //       titleAscending = !titleAscending
    //     }
    //   }
    //   if (d == "Journal") {
    //     if (journalAscending) {
    //       sortFunction = function(a, b) {
    //         return a.Journal.localeCompare(b.Journal)
    //       }
    //       journalAscending = !journalAscending
    //     } else {
    //       sortFunction = function(a, b) {
    //         return b.Journal.localeCompare(a.Journal)
    //       }
    //       journalAscending = !journalAscending
    //     }
    //   }
    //   if (d == "Abstract") {
    //     if (abstractAscending) {
    //       sortFunction = function(a, b) {
    //         return a.Abstract.localeCompare(b.Abstract)
    //       }
    //       abstractAscending = !abstractAscending
    //     } else {
    //       sortFunction = function(a, b) {
    //         return b.Abstract.localeCompare(a.Abstract)
    //       }
    //       abstractAscending = !abstractAscending
    //     }
    //   }
    //   if (d == "Type") {
    //     if (typeAscending) {
    //       sortFunction = function(a, b) {
    //         return a.Type.localeCompare(b.Type)
    //       }
    //       typeAscending = !typeAscending
    //     } else {
    //       sortFunction = function(a, b) {
    //         return b.Type.localeCompare(a.Type)
    //       }
    //       typeAscending = !typeAscending
    //     }
    //   }
    //   if (d == "Year") {
    //     if (yearAscending) {
    //       sortFunction = function(a, b) {
    //         return a.Year.localeCompare(b.Year)
    //       }
    //       yearAscending = !yearAscending
    //     } else {
    //       sortFunction = function(a, b) {
    //         return b.Year.localeCompare(a.Year)
    //       }
    //       yearAscending = !yearAscending
    //     }
    //   }
    //   rows.sort(sortFunction)
    // })

    .on("click", function(d) { // sortere kolonner ascending/descending

      if (d == "Author") {
        if (authorAscending) {
          sortFunction = (a, b) => a.Author.localeCompare(b.Author)
          authorAscending = !authorAscending
        } else {
          sortFunction = (a, b) => b.Author.localeCompare(a.Author)
          authorAscending = !authorAscending
        }
      }
      if (d == "Title") {
        if (titleAscending) {
          sortFunction = (a, b) => a.Title.localeCompare(b.Title)
          titleAscending = !titleAscending
        } else {
          sortFunction = (a, b) => b.Title.localeCompare(a.Title)
          titleAscending = !titleAscending
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
      if (d == "Abstract") {
        if (abstractAscending) {
          sortFunction = (a, b) => a.Abstract.localeCompare(b.Abstract)
          abstractAscending = !abstractAscending
        } else {
          sortFunction = (a, b) => b.Abstract.localeCompare(a.Abstract)
          abstractAscending = !abstractAscending
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

// ➡️ ➡️ ➡️ FRITEKST-SØK ALL COLUMNS ⬅️ ⬅️ ⬅️

// ======================================================================================================================
// ======================================================================================================================

function quickSearch(searchEntry) {
  const tables = document.getElementsByClassName("book-table")
  const searchValueNormalized = searchEntry.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  [].forEach.call(tables, function(table) {
    [].forEach.call(table.tBodies, function(tbody) {
      [].forEach.call(tbody.rows, function(row) {
        if (row.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(searchValueNormalized) > -1) {
          row.style.display = ""
        } else {
          row.style.display = "none"
        }
      })
    })
  })
}

// ======================================================================================================================
// ======================================================================================================================

// ➡️ ➡️ ➡️ FRITEKST-SØK ADVANCED - AUTHOR, TITLE, JOURNAL, ABSTRACT ⬅️ ⬅️ ⬅️

// ======================================================================================================================
// ======================================================================================================================

function advancedSearch() {
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
        } else {
          row.style.display = "none"
        }
      });
    });
  });
}

// ======================================================================================================================
// ======================================================================================================================

// ➡️ ➡️ ➡️ RESET SØK MED KNAPP ⬅️ ⬅️ ⬅️

// ======================================================================================================================
// ======================================================================================================================

// id must be <form> for the .reset() method to work!
function resetSearch() {
  document.getElementById("search-wrapper").reset()

  const tables = document.getElementById("book-table");

  [].forEach.call(tables.tBodies, function(tbody) {
    [].forEach.call(tbody.rows, function(row) {
      row.style.display = ""
    })
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


  // for (let i = 0; i < uniqueValues.length; i++) {
  //   optionsKeywords += "<option value='" + uniqueValues[i] + "'>" + uniqueValues[i] + "</option>";
  // }
  // for-of constr
  // for (const uniqueValue of uniqueValues) {
  //   optionsKeywords += "<option value='" + uniqueValue + "'>" + uniqueValue + "</option>"
  // }
  // same but with new string concatenation
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
  const uniqueValuesType = [...new Set(concatArraysType)].sort();
  let optionsType = "<option value='' hidden>--select--</option>";
  // for (let i = 0; i < uniqueValuesType.length; i++) {
  //   optionsType += "<option value='" + uniqueValuesType[i] + "'>" + uniqueValuesType[i] + "</option>";
  // }
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
  let uniqueValuesFromYear = [...new Set(concatArraysYear)].sort();
  let optionsFromYear = "<option value='' hidden>--select--</option>";
  // for (let i = 0; i < uniqueValuesFromYear.length; i++) {
  //   optionsFromYear += "<option value='" + uniqueValuesFromYear[i] + "'>" + uniqueValuesFromYear[i] + "</option>";
  // }
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
  // for (let i = 0; i < uniqueValuesToYear.length; i++) {
  //   optionsToYear += "<option value='" + uniqueValuesToYear[i] + "'>" + uniqueValuesToYear[i] + "</option>"
  // }
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

  buildDropDownMenus(dataset);
  bookTable(dataset, ["Type", "Record", "Author", "Year", "Journal", "Title", "Series", "Published", "Volume", "Pages", "Date", "ShortTitle", "Label", "Keywords", "Abstract", "Language", "Notes"])

}

getData()
