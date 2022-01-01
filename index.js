const http = require('http');
const fs = require('fs')

function render(req,res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    fs.readFile('index.html',(err,data)=>{
        res.end(data.toString());
    })
}

function dateNoteNums(req,res) {
    let jsons = fs.readdirSync('jsons')
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(jsons.map(date=>{
        return {
            date,
            num: fs.readdirSync(`jsons/${date}`).length
        }
    })))
}

const server = http.createServer((req, res) => {
    const url = req.url.split('?')[0]
    const params = req.url.split('?')[1]?.split('&').map(item=>{
        return {
            key: item.split('=')[0],
            value: item.split('=')[1]
        }
    })??[]

    switch (url) {
        case '/':render(req,res);break;
        case '/api/dateNoteNums':dateNoteNums(req,res);break;
    }
});

server.listen(3303, () => {
    console.log(`Server running at http://localhost:3303/`);
});
