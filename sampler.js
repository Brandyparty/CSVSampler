function generate() {
    this.generateCSVContent(document.getElementById("size").value, document.getElementById("column").value);
}

function generateCSVContent(size, sampleColumns = 7) {
    let chunks = ["aaa", "bbb", "ccc", "ddd", "eee", "fff", "ggg", "hhh", "iii", "jjj", "kkk", "lll", "mmm", "nnn", "ooo", "ppp", "qqq", "rrr", "sss", "ttt", "uuu", "vvv", "www", "xxx", "yyy", "zzz"];
    let datasets = 0;
    let tally = 0;
    let rows = [];
    for (;datasets < size; datasets++) {
        let row = [];
        for (let i = 0; i < sampleColumns; i++) {
            console.log(tally);
            console.log(tally % chunks.length);
            row.push(chunks[tally % chunks.length]);
            tally++;
        }
        rows.push(row);
    }
    //https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
    let csvContent = "data:text/csv;charset=utf-8," 
    + rows.map(e => e.join(",")).join("\n");
    this.makeDownload(csvContent);
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