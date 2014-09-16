#include <cppcms/application.h>
#include <cppcms/service.h>
#include <cppcms/http_response.h>
#include <cppcms/url_dispatcher.h>
#include <cppcms/url_mapper.h>
#include <cppcms/applications_pool.h>

#include <cppdb/frontend.h>
#include <iostream>
#include <stdlib.h>


class central : public cppcms::application 
{
  cppdb::session sql;
  
public:
	central (cppcms::service &srv) : 
	  cppcms::application (srv)  
	{
		  //this->sql.open("postgresql:dbname=edushell_db;user=edushell;host=localhost;password=123456;@pool_size=10");

		  //dispatcher ().assign ("/get", &users::get, this);
		  //mapper ().assign ("get", "/get");
  
		  dispatcher ().assign ("/html", &central::html, this);
		  mapper ().assign ("html", "/html");

		  mapper ().root ("/central");
	}
	
	void html ();
	void welcome ();
	
};

void central::html ()
{
  response ().out () << 
    "<html>\n"
    "<head>\n"
    	"<meta name=\"viewport\" content=\"width=device-width, user-scalable=no, content=\"initial-scale=1, maximum-scale=1\">\n"
    	"<link type=\"text/css\" rel=\"stylesheet\" id=\"reset\" href=\"../../frontend/css/reset.css\"></script>\n"
		"<script type=\"text/javascript\" src=\"../../frontend/javascript/gwt.js\"></script>\n"
		"<script type=\"text/javascript\" src=\"../../frontend/javascript/init_d.js\"></script>\n"
    "</head>\n"
    "<body>\n"
    "</body>\n"
    "</html>\n";
}

void central::welcome ()
{
	response ().out () << "welcome";
}

/*void get ()
{
	cppcms::json::value my_object;
  
	cppdb::result res = this->sql << "SELECT first_name, last_name FROM users WHERE id=?" << 1 << cppdb::row;
	
	
	if (!res.empty ())
	{
		my_object["first_name"] = res.get<std::string>("first_name");
		my_object["last_name"] = res.get<std::string>("last_name");
	}
	
  my_object["mesage"] = "hola mundo!";

  response ().set_header ("Content-Type", "application/json");
  response ().set_header ("Server", "server cppcms/1.4.2");

  response ().out () << my_object;
}*/

int main (int argc, char * argv[])
{
	try
	{
		cppcms::service srv(argc, argv);
		srv.applications_pool ().mount (cppcms::applications_factory<central>());
		srv.run ();
	}
	catch (std::exception const &e)
	{
		std::cerr << e.what () << std::endl;
	}
	
	return 0;
}
