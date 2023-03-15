const http =require('http');
const fs = require('fs');
const server=http.createServer((req,res)=>{
    const url=req.url;
  const method = req.method;
    if(url==='/'){
    res.setHeader('Content-Type','text/html')
    res.write('<html>')
    res.write('<head><title>Title</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
    res.write('<html>');
    return res.end();
} 
if (url === '/message' && method === 'POST') {
    const body=[];
    req.on('data',(chunk)=>{
        body.push(chunk);
        console.log(chunk);
    })
    req.on('end',()=>{
        const parsedBody= Buffer.concat(body).toString();
        const message= parsedBody.split('=')[1];
        fs.writeFileSync('message.txt', message,(err)=>{
          res.statusCode = 302;
          res.setHeader('Location', '/');
          return res.end();
        });
    })
  }

    res.setHeader('Content-Type','text/html')
    res.write('<html>')
    res.write('<head><title>Title of node js</title></head>');
    res.write('<body><h1>Heading</h1></body>');
    res.write('<html>');
     res.end();
})
server.listen(3000)
console.log('running');