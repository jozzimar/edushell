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

//##################################################################################################
//Class Gwt::Frame
function Frame ()
{
	this.html = document.createElement("div");
	this.html.className = "gwt_frame";
	
	this.border = 0;
	this.width = 0;
	this.height = 0;
	this.x = 0;
	this.y = 0;
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

Frame.prototype.attach_event = function (event, fn)
{
	this.html.addEventListener (event, fn, false);
}

Frame.prototype.remove_event = function (event, fn)
{
	this.html.removeEventListener (event, fn, false);
}

Frame.prototype.set_size = function (width, height)
{
	this.width = width;
	this.height = height;
	this.html.style.width = (this.width-(this.border*2))-2+"px";
	this.html.style.height = (this.height-(this.border*2))-2+"px";
}

Frame.prototype.get_size = function ()
{
	return {width: this.width, height: this.height};
}

Frame.prototype.set_position = function (x, y)
{
	if (x == Gwt.WIN_POS_CENTER && y == undefined)
	{
		this.x = (Gwt.SCREEN_DEVICE.width/2) - (this.width/2);
		this.y = (Gwt.SCREEN_DEVICE.height/2) - (this.height/2);
	}
	else if (x != undefined && y != undefined)
	{
		switch (x)
		{
			case Gwt.WIN_POS_LEFT:
				this.x = 0;
				break;
			
			case Gwt.WIN_POS_CENTER:
				this.x = (Gwt.SCREEN_DEVICE.width/2) - (this.width/2);
				break;
			
			case Gwt.WIN_POS_RIGHT:
				this.x = (Gwt.SCREEN_DEVICE.width - this.width)-2;
				break;
				
			default:
				this.x = x;
		}
		
		switch (y)
		{
			case Gwt.WIN_POS_TOP:
				this.y = 0;
				break;
				
			case Gwt.WIN_POS_CENTER:
				this.y = (Gwt.SCREEN_DEVICE.height/2) - (this.height/2);
				break;
				
			case Gwt.WIN_POS_BOTTOM:
				this.y = (Gwt.SCREEN_DEVICE.height - this.height)-2;
				break;
				
			default:
				this.y = y;
		}
	}
	else
	{
		this.x = 0;
		this.y = 0;
	}
	
	this.html.style.left = this.x;
	this.html.style.top = this.y;
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
this.set_size (Gwt.SCREEN_DEVICE.width, Gwt.SCREEN_DEVICE.height);
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
	this.set_border_width (10);
	this.set_size (Gwt.SCREEN_DEVICE.width * 0.95, Gwt.SCREEN_DEVICE.height * 0.95);
	this.set_position (Gwt.WIN_POS_CENTER);
}

Window.prototype.set_border_width = function (border)
{
	this.border = border;
	this.set_size (this.width - (this.border*2), this.height - (this.border*2));
	this.html.style.padding = border;
}
//Ends Gwt::Window
//##################################################################################################

//Class Gwt::Label
function Label ()
{
	Frame.call (this);
	this.html = document.createElement("p");
	this.html.className = "gwt_label";
	this.text = "Default text";
	this.html.textContent = this.text;
}

Label.prototype = Object.create (Frame.prototype);

Label.prototype.finalize = function ()
{
	Frame.finalize.call (this);
	this.text = null;
}

Label.prototype.set_text = function (text)
{
	this.text = text;
	this.html.textContent = this.text;
}

Label.prototype.set_size = function (size)
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

return {
WIN_POS_CENTER : "WIN_POS_CENTER",
WIN_POS_LEFT : "WIN_POS_LEFT",
WIN_POS_TOP : "WIN_POS_TOP",
WIN_POS_RIGHT : "WIN_POS_RIGHT",
WIN_POS_BOTTOM : "WIN_POS_BOTTOM",
SCREEN_DEVICE : screen_device(),
Frame : Frame,
Desktop : Desktop,
Window : Window,
Label : Label,
Image : Image,
Entry : Entry,
Selectbox : Selectbox
}

}
)();
