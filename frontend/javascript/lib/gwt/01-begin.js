var Gwt = (function ()
{
//####################################################################################################
//environments constants
var host = "../../frontend/";
//##################################################################################################
//screen info
function screen_device ()
{
	var width = window.innerWidth;
	var height = window.innerHeight;
	var pixel_ratio = devicePixelRatio;
	var orientation = width > height ? "landscape" : "portrait";
	var aspect_ratio = orientation === "landscape" ? width/height : height/width;
	
	return {width: width, height: height, pixel_ratio: pixel_ratio, orientation: orientation, aspect_ratio: aspect_ratio.toString().substring(0,4)};
}
//##################################################################################################

//css module load
function loadCss() {
	var links = document.getElementsByTagName("link");
	for (var i = 0; i < links.length; i++)
	{
		if(links[i].id == "gwt.css")
		{
			return;
		}
	}
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.id = "gwt.css";
    link.href = (host+"css/"+link.id);
    document.getElementsByTagName("head")[0].appendChild(link);
} loadCss();

