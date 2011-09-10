//# (C) Copyright 2011 Ahmed Aboud

var time_variable;
function getXMLObject() 
{
   var xmlHttp = false;
   try {
     xmlHttp = new ActiveXObject("Msxml2.XMLHTTP") 
   }
   catch (e) {
     try {
       xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")  
     }
     catch (e2) {
       xmlHttp = false   
     }
   }
   if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
     xmlHttp = new XMLHttpRequest();       
   }
   return xmlHttp;
} 
var xmlhttp = new getXMLObject();	

function ajaxFunction() {
  var getdate = new Date();  
  if(xmlhttp) { 
  	var txtname = document.getElementById("link");
    xmlhttp.open("POST","process.php",true);
    xmlhttp.onreadystatechange  = handleServerResponse;
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send("link=" + link.value); 
	Progress();
  }
}
function handleServerResponse() {
   if (xmlhttp.readyState == 4) {
     if(xmlhttp.status == 200) {
       document.getElementById("source_url").value=xmlhttp.responseText; 
     }
     else {
        alert("Error during AJAX call. Please try again");
     }
   }
}

//decode url
 function decode_url(url) 
   {
		url = url.replace(/\\u00253A/g,":");
		url = url.replace(/\\u00252F/g,'/');
		url = url.replace(/\\u00253F/g,"?");
		url = url.replace(/\\u00253D/g,"=");
		url = url.replace(/\\u002526/g,"&");
		return url;
	}
//get video url from source code
function get_video_source () 
 {
   var ch=document.getElementById("source_url").value;
   switch (ch.indexOf("mp4")) {  
   case -1 :
     alert('video not found pleaze try again');
     setTimeout("window.location ='index.php'",4000);
   break;
   default :	
 //video-src
   var ch1='';
    for (i=ch.lastIndexOf("swf_id");i>=ch.indexOf("video_src");i--)
     {
      ch1+=ch.charAt(i);
     }
   var ch2='';
    for (i=ch1.length;i>=0;i--)
     {
      ch2+=ch1.charAt(i);
     }
   var ch0='';
    for (i=ch2.indexOf("video_src")+13;i<=ch2.indexOf('swf_id')-4;i++)
     {
      ch0+=ch2.charAt(i);
     }
      document.getElementById("load-f").innerHTML='<EMBED SRC="'+decode_url(ch0)+'" HEIGHT=180 WIDTH=180><br><center><h3 color=blue>to Download This Video (Right click on this link==>save link as)</h3></center></center><h2 color=red><a href="'+decode_url(ch0)+'">Download</h2></center>';
    setTimeout("load()",1000);
      break;
     }
}
 

 //case video found change layaout		
function load () 
{
document.getElementById('load-v').style.display='';
document.getElementById('load-f').style.display='';
 }



var count=0;
function Progress() 
{	
   count++;
   document.getElementById('btn1').value=count+'%';
   if (count<100) {setTimeout('Progress()',100);}
   else  {document.getElementById('btn1').style.display='none';get_video_source ();}
}
  
  
