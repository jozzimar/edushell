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

