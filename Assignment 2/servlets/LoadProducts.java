import java.io.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import sdsu.*;

public class LoadProducts extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response)
    throws IOException, ServletException
    {
         boolean flag = false;
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        String ven = request.getParameter("vendor");
        String cat = request.getParameter("category");
        String sortby = request.getParameter("sortby");
        String searchval = request.getParameter("searchval");
        String sku = request.getParameter("sku");

        // String s1 = "SELECT * FROM product";
        String s = "SELECT product.sku, vendor.name, category.name, product.vendorModel, product.description, product.features, product.cost, product.retail, product.image, product.quantity FROM product inner join category on product.catID = category.id inner join vendor on product.venID = vendor.id";
        if(cat != null){
             s += " where catID in " + cat;
             flag = true;
        }
        if(ven != null){
             if(flag){
                  s += " and venID in " + ven;
             }
             else{
                  s += " where venID in " + ven;
                  flag = true;
             }
        }
        if(searchval != null){
             if(flag){   //search by manufid or category or vendor
                  s += "and (product.vendorModel like '%"+searchval+"%' or product.description like '%"+searchval+"%' or product.features like '%"+searchval+"%' or category.name like '%"+searchval+"%' or vendor.name like '%"+searchval+"%')";
             }
             else{
                  s += "where (product.vendorModel like '%"+searchval+"%' or product.description like '%"+searchval+"%' or product.features like '%"+searchval+"%' or category.name like '%"+searchval+"%' or vendor.name like '%"+searchval+"%')";
                  flag = true;
             }
        }
        if(sortby != null){
             s += " order by product.retail "+sortby;
        }
        if(sku != null){
               s = "";
               s += "SELECT product.sku, vendor.name, category.name, product.vendorModel, product.description, product.features, product.cost, product.retail, product.image, product.quantity FROM product inner join category on product.catID = category.id inner join vendor on product.venID = vendor.id where sku in "+sku;
        }

        String result = DBHelper.getquerydata(s);
        // out.print(cat);
        out.print(result);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
    throws IOException, ServletException
    {
    	    doGet(request, response);
    }
}
