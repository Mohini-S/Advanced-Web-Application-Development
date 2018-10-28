package sdsu;

import java.sql.*;
import java.util.*;

public class DBHelper implements java.io.Serializable {
    private static String connectionURL = "jdbc:mysql://opatija:3306/jadrn036?user=jadrn036&password=drawer";
    private static Connection connection = null;
    private static Statement statement = null;
    private static ResultSet resultSet = null;

    public DBHelper() {}

    public static Vector runQuery(String s) {
        String answer = "";
        Vector<String []> answerVector = null;

	try {
	Class.forName("com.mysql.jdbc.Driver").newInstance();
	connection = DriverManager.getConnection(connectionURL);
	statement = connection.createStatement();
	resultSet = statement.executeQuery(s);
        ResultSetMetaData rsmd = resultSet.getMetaData();
        answerVector = new Vector<String []>();
	while(resultSet.next()) {
          String [] row = new String[rsmd.getColumnCount()];
          for(int i=0; i < rsmd.getColumnCount(); i++){
               row[i] = resultSet.getString(i+1);
          }
          answerVector.add(row);
		}
	}
	catch(Exception e) {
	    e.printStackTrace();
	}
        //////////////////////////////////////////////////////////////////////////
        // The finally clause always runs, and closes resources if open.
        // DO NOT OMIT THIS!!!!!!
        finally {
            try {
                if(resultSet != null)
                    resultSet.close();
                if(statement != null)
                    statement.close();
                if(connection != null)
            	    connection.close();
                }
            catch(SQLException e) {
                answer += e;
                }
        //////////////////////////////////////////////////////////////////////////
        }
        return answerVector;
    }

    public static String doQuery(String s) {
         String answer = "";
	    try {
              Class.forName("com.mysql.jdbc.Driver").newInstance();
              connection = DriverManager.getConnection(connectionURL);
              statement = connection.createStatement();
              resultSet = statement.executeQuery(s);
              ResultSetMetaData rsmd = resultSet.getMetaData();

              while(resultSet.next()) {
                    int columns = rsmd.getColumnCount();
                    for(int i=1; i <= columns; i++)  {
                        answer += resultSet.getString(rsmd.getColumnName(i));
                        }
		    }
		}
		catch(Exception e) {
			e.printStackTrace();
			return e.toString();
			}
        //////////////////////////////////////////////////////////////////////////
        // The finally clause always runs, and closes resources if open.
        // DO NOT OMIT THIS!!!!!!
        finally {
            try {
                if(resultSet != null)
                    resultSet.close();
                if(statement != null)
                    statement.close();
                if(connection != null)
            	    connection.close();
                }
            catch(SQLException e) {
                answer += e;
                }
        //////////////////////////////////////////////////////////////////////////
        }
        return answer;
    }


    public static String getquerydata(String s) {
         String answer = "";
	    try {
              Class.forName("com.mysql.jdbc.Driver").newInstance();
              connection = DriverManager.getConnection(connectionURL);
              PreparedStatement statement = connection.prepareStatement(s);
              resultSet = statement.executeQuery();

              ResultSetMetaData rsmd = resultSet.getMetaData();
              int columns = rsmd.getColumnCount();
              while(resultSet.next()) {
                   for(int i=0; i < columns; i++)  {
                         if(answer.isEmpty())
                              answer += answer + resultSet.getString(i+1);
                         else
                              answer += "|" + resultSet.getString(i+1);
                    }
                    answer += "||";
               }
		}
		catch(Exception e) {
			e.printStackTrace();
			//return e.toString();
			}
        //////////////////////////////////////////////////////////////////////////
        // The finally clause always runs, and closes resources if open.
        // DO NOT OMIT THIS!!!!!!
        finally {
            try {
                if(resultSet != null)
                    resultSet.close();
                if(statement != null)
                    statement.close();
                if(connection != null)
            	    connection.close();
                }
            catch(SQLException e) {
                answer += e;
                }
        //////////////////////////////////////////////////////////////////////////
        }
        return answer;
    }

    public static int updatequerydata(String s) {
         // String answer = "";
         int answer = 0;
	    try {
              // String[] s1= s.split("sku ="); //get sku from given query
              // String sku = s1[1];
              // String[] s2= s1[1].split(" where");
              // int subquant = Integer.parseInt(s2[0]);
              // String getquant = "SELECT quantity from product where sku ="+sku;

              Class.forName("com.mysql.jdbc.Driver").newInstance();
              connection = DriverManager.getConnection(connectionURL);
              statement = connection.createStatement();
              answer = statement.executeUpdate(s);
              //ResultSetMetaData rsmd = resultSet.getMetaData();
              // answer = resultSet.getString(s);

              // int updatequant = Integer.parseInt(answer) - subquant;
              // String query = "UPDATE product SET quantity = "+updatequant+" where sku = " + sku ;
              // Class.forName("com.mysql.jdbc.Driver").newInstance();
              // connection = DriverManager.getConnection(connectionURL);
              // statement = connection.createStatement();
              // resultSet = statement.executeQuery(query);

		}
		catch(Exception e) {
			e.printStackTrace();
			//return e.toString();
			}
        //////////////////////////////////////////////////////////////////////////
        // The finally clause always runs, and closes resources if open.
        // DO NOT OMIT THIS!!!!!!
        finally {
            try {
                if(resultSet != null)
                    resultSet.close();
                if(statement != null)
                    statement.close();
                if(connection != null)
            	    connection.close();
                }
            catch(SQLException e) {
                // answer += e;
                }
        //////////////////////////////////////////////////////////////////////////
        }
        return answer;
    }
}
