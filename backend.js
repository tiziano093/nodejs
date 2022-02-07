'user strict';

const express = require('express');
const fs = require('fs');

const PORT = 5000;
const HOST = '0.0.0.0';

const app = express();
app.get('/', (req, res) => {
    const filePath = "output.file"; // or any file format

    // Check if file specified by the filePath exists
    fs.exists(filePath, function (exists) {
        if (exists) {
            // Content-type is very interesting part that guarantee that
            // Web browser will handle response in an appropriate manner.
            res.writeHead(200, {
                "Content-Type": "application/octet-stream",
                "Content-Disposition": "attachment; filename=" + 'outpit.file'
            });
            fs.createReadStream(filePath).pipe(res);
            return;
        }
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("ERROR File does not exist");
    });
});

app.listen(PORT, HOST);
console.log(`running on http://${HOST}:${PORT}`);