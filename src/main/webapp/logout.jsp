<%-- 
    Document   : logout
    Created on : Apr 13, 2017, 2:32:37 PM
    Author     : Jonathan Opdahl
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Logout</title>
    </head>
    <body><%
            session.invalidate();
            response.sendRedirect("login.html");
          %>
    </body>
</html>
