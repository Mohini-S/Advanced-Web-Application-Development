import java.io.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import sdsu.*;

public class BrowseData extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response)
    throws IOException, ServletException
    {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        String browse = request.getParameter("browse");
        String s;
        String result = "";

        if(browse.trim().equals("category")){
             s = "SELECT * FROM category";
             result = DBHelper.getquerydata(s);
        }
        else if(browse.trim().equals("vendor")){
             s = "SELECT * FROM vendor";
             result = DBHelper.getquerydata(s);
        }
        out.print(result);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
    throws IOException, ServletException
    {
    	    doGet(request, response);
    }
}
