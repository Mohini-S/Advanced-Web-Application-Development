import java.io.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import sdsu.*;

public class UpdateProducts extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response)
    throws IOException, ServletException
    {
         boolean flag = false;
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        String s = request.getParameter("sku_str");
        s = s.replace("(","");
        s = s.replace(")","");
        String s1[] = s.split(",");
        for(int i=0;i< s1.length;i++){
             String str[] = s1[i].split("=");
             String sku = str[0];
             int q = Integer.parseInt(str[1]);
             // String query1 = "SELECT quantity from product where sku ='"+sku+"'";
             // String r = DBHelper.doQuery(query1);
             // int quant = Integer.parseInt(r);
             // int diff = quant - q;
             String query = "UPDATE product SET quantity = quantity-"+q+" where sku = '" + sku + "'";
             DBHelper.updatequerydata(query);
        }

        // String result = DBHelper.getquerydata(s);
        // out.print(result);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
    throws IOException, ServletException
    {
    	    doGet(request, response);
    }
}
