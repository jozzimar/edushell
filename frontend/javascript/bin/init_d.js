window.addEventListener ("load", init_d, false);

function init_d (event)
{
	//console.log(Gwt.SCREEN_DEVICE);
	var desktop = new Gwt.Desktop ();
	
	var example = new Gwt.Window ();
	//example.set_border_width (10);
	//example.set_size (300, 300);
	//console.log (example);
	var text = new Gwt.Label ();
	text.set_size ("14pt");
	text.set_text ("Edushell");
	
	/*var image = new Gwt.Image ();
	image.set_image ("connecting_world.svg");
	image.set_size (300, 200);
	
	var entry = new Gwt.Entry ();
	entry.set_placeholder ("Username");
	
	var select = new Gwt.Selectbox ();
	select.push ("c.c", "Cédudla");
	
	
	example.add (image);
	example.add (entry);
	example.add (select);*/
	example.add (text);
	desktop.add (example);
}
