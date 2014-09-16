var Gwt = (function ()
{
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

//##################################################################################################
//Class Gwt::Frame
function Frame ()
{
	this.html = document.createElement("div");
	this.html.className = "gwt_frame";
	
	this.width;
	this.height;
	this.x;
	this.y;
}
	
Frame.prototype.finalize = function ()
{
	document.body.removeChild (this.html);
	this.html = null
	this.width = null;
	this.height = null;
	this.x = null;
	this.y = null;
}

Frame.prototype.add = function (element)
{
	this.html.appendChild (element.html);
}

Frame.prototype.set_size = function (width, height)
{
	this.width = width;
	this.height = height;
	this.html.style.width = width+"px";
	this.html.style.height = height+"px";
}

Frame.prototype.set_position = function (x, y)
{
	this.x = x;
	this.y = y;
	this.html.style.left = x;
	this.html.style.top = y;
}

Frame.prototype.attach_event = function (event, fn)
{
	this.html.addEventListener (event, fn, false);
}

Frame.prototype.remove_event = function (event, fn)
{
	this.html.removeEventListener (event, fn, false);
}
//Ends Gwt::Frame Class

//##################################################################################################
//Class Gwt::Desktop
function Desktop ()
{
	Frame.call(this);
	this.html = document.body;
	this.html.className = "gwt_desktop";
	
	this.adjustment_size ();
}

Desktop.prototype = Object.create (Frame.prototype);

Desktop.prototype.finalize = function ()
{
	Frame.prototype.finalize.call (this);
}

Desktop.prototype.adjustment_size = function ()
{
	this.set_size (Gwt.screen_device.width, Gwt.screen_device.height);
}
//Ends Gwt::Desktop
//##################################################################################################

//Class Gwt::Window
function Window ()
{
	Frame.call(this);
	this.html.className = "gwt_window";
	
	this.init_ui ();
}

Window.prototype = Object.create (Frame.prototype);

Window.prototype.finalize = function ()
{
	Frame.prototype.finalize.call (this);
}

Window.prototype.init_ui = function ()
{
    this.set_size (Gwt.screen_device.width * 0.95, Gwt.screen_device.height * 0.95);
	this.set_position (Gwt.screen_device.width * 0.025, Gwt.screen_device.height * 0.025);
}

Window.prototype.set_width_border = function (border)
{
	this.set_size (this.width - (border*2), this.height - (border*2));
	this.html.style.padding = border;
}
//Ends Gwt::Window
//##################################################################################################

//Class Gwt::Static_text
function Static_text ()
{
	Frame.call (this);
	this.html = document.createElement("p");
	this.html.className = "gwt_statictext";
	this.text = "Default text";
	
	this.html.textContent = this.text;
}

Static_text.prototype = Object.create (Frame.prototype);

Static_text.prototype.finalize = function ()
{
	Frame.finalize.call (this);
	this.text = null;
}

Static_text.prototype.set_text = function (text)
{
	this.text = text;
	this.html.textContent = this.text;
}

Static_text.prototype.set_size = function (size)
{
	this.html.style.fontSize = size;
}
//Ends Gwt::Static_text
//##################################################################################################

//Class Gwt::Image
function Image ()
{
	Frame.call (this);
	this.html = document.createElement("img");
	this.html.className = "gwt_image";
	this.html.src = host+"images/default_image.svg";
}

Image.prototype = Object.create (Frame.prototype);

Image.prototype.finalize = function ()
{
	Frame.prototype.finalize.call (this);
}

Image.prototype.set_image = function (image)
{
	this.html.src = host+"images/"+image;
}
//Ends Gwt::Image
//##################################################################################################

//Class Gwt::Entry
function Entry ()
{
	Frame.call (this);
	this.html = document.createElement("input");
	this.html.className = "gwt_entry";
}

Entry.prototype = Object.create (Frame.prototype);

Entry.prototype.finalize = function ()
{
    Frame.prototype.finalize.call (this);
}

Entry.prototype.set_placeholder = function (text)
{
    this.html.placeholder = text;
}
//Ends Gwt::Entry
//##################################################################################################

//Class Gwt::Selectbox
function Selectbox ()
{
	Frame.call (this);
	this.html = document.createElement("ol");
	this.html.className = "gwt_selectbox";
	this.options = [];
	
	this.init ();
}

Selectbox.prototype = Object.create (Frame.prototype);

Selectbox.prototype.finalize = function ()
{
	Frame.prototype.finalize.call (this);
}

Selectbox.prototype.init = function ()
{
	this.options[this.options.length] = document.createElement("li");
	this.options[this.options.length-1].value = undefined;
	this.options[this.options.length-1].text = "Seleccione una opción";
	this.html.appendChild(this.options[this.options.length-1]);
}

Selectbox.prototype.push = function (value, text)
{
	this.options[this.options.length] = document.createElement("option");
	this.options[this.options.length-1].value = value;
	this.options[this.options.length-1].text = text;
	this.html.appendChild(this.options[this.options.length-1]);
}
//Ends Gwt::Selectbox
//##################################################################################################

//Ends Gwt's Classes;
//Gwt Module. Public Class list
return {
screen_device : screen_device(),
Frame : Frame,
Desktop : Desktop,
Window : Window,
Static_text : Static_text,
Image : Image,
Entry : Entry,
Selectbox : Selectbox
}

}
)();
