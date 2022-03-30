function generate() {
    this.generateCSVContent(document.getElementById("size").value, document.getElementById("column").value);
}

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//https://stackoverflow.com/questions/563406/how-to-add-days-to-date
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function generateCSVContent(size, sampleColumns = 7) {
    let chunks = ["date", "aaa", "bbb", "ccc", "ddd", "eee", "fff", "ggg", "hhh", "iii", "jjj", "kkk", "lll", "mmm", "nnn", "ooo", "ppp", "qqq", "rrr", "sss", "ttt", "uuu", "vvv", "www", "xxx", "yyy", "zzz"];
    let datasets = 0;
    let tally = 0;
    let rows = [];
    //random start
    let date = new Date('1980-10-01');
    let timetochangedate = getRandomInt(100);
    let addDays = getRandomInt(365);
    let entriesForThatDate = 0;
    rows.push(chunks.slice());
    for (;datasets < size; datasets++) {
        for (let i = 0; i < sampleColumns; i++) {
            chunks[0] = date.toLocaleDateString();
            entriesForThatDate++;
            if (entriesForThatDate == timetochangedate) {
                date = this.addDays(date, addDays);
                entriesForThatDate = 0;
                timetochangedate = getRandomInt(100);
                addDays = getRandomInt(365);
            }
            tally++;
        }
        rows.push(chunks.slice());
    }

    if (tally > 100000) {
        this.downloadFile(rows);
    } else {
        //https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
        let csvContent = "data:text/csv;charset=utf-8," 
        + rows.map(e => e.join(",")).join("\n");
        this.makeDownload(csvContent);
    }
}

//https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
function makeDownload(csvContent) {
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "my_data.csv".
}

//https://stackoverflow.com/questions/23301467/javascript-exporting-large-text-csv-file-crashes-google-chrome
function downloadFile(data, fileName = "my_large_data.csv") {
    var csvData = data;
    var blob = new Blob([ csvData ], {
        type : "application/csv;charset=utf-8;"
    });

    if (window.navigator.msSaveBlob) {
        // FOR IE BROWSER
        navigator.msSaveBlob(blob, fileName);
    } else {
        // FOR OTHER BROWSERS
        var link = document.createElement("a");
        var csvUrl = URL.createObjectURL(blob);
        link.href = csvUrl;
        link.style = "visibility:hidden";
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}