let mergedData;

fetch("https://www.wikitable2json.com/api/List_of_museums_and_galleries_in_Berlin")
  .then((res) => res.json())
  .then((data) => {
    const result = data[0].reduce((acc, [name, image, neighborhood, borough, type, summary], index) => {
      if (index !== 0) {
        acc.push({
          name,
          image,
          neighborhood,
          borough,
          type,
          summary,
        });
      }
      return acc;
    }, []);
    mergedData = result;
  })
  .then(() => {
    return fetch("https://en.wikipedia.org/w/api.php?action=parse&format=json&page=List%20of%20museums%20and%20galleries%20in%20Berlin&prop=text&section=1&origin=*");
  })
  .then((res) => res.json())
  .then((data) => {
    const htmlCode = data?.parse?.text?.["*"];
    const parser = new DOMParser();
    const html = parser.parseFromString(htmlCode, "text/html");
    const htmlTable = html.querySelectorAll(".wikitable")[0];
    return htmlTable;
  })
  .then((htmlTable) => {
    const parsed = tableToJson(htmlTable);

    return Promise.all(
      parsed.map((item) => {
        const parser = new DOMParser();
        const html = parser.parseFromString(item["image\n"], "text/html");
        const fileName = html.querySelector("img")?.alt;
        if (fileName) {
          return grabImageData(fileName);
        }
      })
    );
  })
  .then((allPictures) => {
    allPictures.forEach((pic, index) => {
      mergedData[index].image = pic;
    });
    // console.log(mergedData);
    console.log(JSON.stringify(mergedData, null, 2));
  })
  .catch((e) => console.log(e));

function grabImageData(filename) {
  return fetch(`https://api.wikimedia.org/core/v1/commons/file/${filename}?origin=*`)
    .then((res) => res.json())
    .then((data) => data?.preferred?.url);
}

function tableToJson(table) {
  let data = [];

  // first row needs to be headers
  let headers = [];
  for (let i = 0; i < table.rows[0].cells.length; i++) {
    headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi, "");
  }

  // go through cells
  for (let i = 1; i < table.rows.length; i++) {
    let tableRow = table.rows[i];
    let rowData = {};

    for (let j = 0; j < tableRow.cells.length; j++) {
      rowData[headers[j]] = tableRow.cells[j].innerHTML;
    }

    data.push(rowData);
  }

  return data;
}
