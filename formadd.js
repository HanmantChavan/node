var http=require("http");
var url=require("url");
var fs=require("fs");
var query=require("querystring");
var m=require("./formaddmod.js");
http.createServer(function(req,resp)
{
	var u= url.parse(req.url);
	resp.writeHead(200,{"Content-Type":"text/html"});
	switch(u.pathname)
	{
		
		case"/":
		fs.readFile("form.html",function(err,data)
		{
			console.log("listening on port 8000")
			if(err)
			{
				resp.write("Some Error");
				console.log(err);
				resp.end();
			}
			else
			{
				resp.write(data);
				resp.end();
			}
		});
		break;
		case "/calc":
		var str="";
		req.on('data',function(d)
		{
			str+=d;
		}
		);
		req.on('end',function()
		{
			console.log(str);
			var s=query.parse(str);
			var avg=m.average(s.marks1,s.marks2,s.marks3);
			resp.end("student name is" +" "+s.nm+ " "+"average marks are" +" " +avg);
			
		});
	}
	
	
}).listen(8000);
