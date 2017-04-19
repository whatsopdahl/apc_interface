package com.apc.luthercourseproposal;

import com.apc.luthercourseproposal.ApcDao.Collections;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.io.Reader;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.security.Principal;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.json.*;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * Handles all HTTP requests. When HTTP requests are made, they are sent by
 * the {@link ApcBackend} file here, and get parsed and responded to.
 * <p>
 * This class also provides interfacing with a <code>MongoDB</code> database,
 * which is responsible for maintaining and serving all required data.
 *
 * @author Aidan Schmitt
 * @version 1.1
 * @since 1.0_1
 * @see HttpHandler
 * @see MongoDatabase
 * @see MongoClient
 */
public class ApcController extends HttpServlet {
    /**
     * <code>String</code> finals for HTML header setting.
     * Note: <code>HEADER_CONTENT_TYPE might not be needed.
     */
    private static final String HEADER_ALLOW = "Allow";
    private static final String HEADER_CONTENT_TYPE = "Content-Type";

    /**
     * Character set for encoding/decoding HTTP requests.
     * Note: This might not be needed.
     */
    private static final Charset CHARSET = StandardCharsets.UTF_8;

    /**
     * HTTP status codes.
     * <p>
     * STATUS_OKAY (200) GET method successful.
     * STATUS_CREATED (201) POST method successful in creating resources
     * STATUS_NO_CONTENT (204) method successful, but not returning any content
     * STATUS_BAD_REQUEST (400) request formatted incorrectly and is unable to
     *  be processed
     * STATUS_NOT_FOUND (404) resource request formatted correctly, but resource
     *  not found
     * STATUS_METHOD_NOT_ALLOWED (405) requested an invalid method
     *  (GET, POST, and OPTIONS are only valid options)
     */
    private static final int STATUS_OK = 200;
    private static final int STATUS_CREATED = 201;
    private static final int STATUS_NO_CONTENT = 204;
    private static final int STATUS_BAD_REQUEST = 400;
    private static final int STATUS_NOT_FOUND = 404;
    private static final int STATUS_METHOD_NOT_ALLOWED = 405;

    /**
     * Length to put in the HTTP response headers if the message body has no
     * contents.
     */
    private static final int NO_RESPONSE_LENGTH = -1;

    /**
     * <code>String</code> finals for HTTP methods.
     */
    private static final String METHOD_GET = "GET";
    private static final String METHOD_POST = "POST";
    private static final String METHOD_OPTIONS = "OPTIONS";
    private static final String ALLOWED_METHODS = METHOD_GET + "," + METHOD_POST + "," + METHOD_OPTIONS;
    
    private static final Logger logger = Logger.getLogger( ApcController.class.getName() );
    
    /**
     * Handles the HTTP requests. Switches based on method type, and handles
     * each method differently. If an invalid method is used, it sends a 405
     * error and tells the client which methods are available.
     * <p>
     * GET request format:
     *      apc.url.luther.edu/{@link ApcBackend.CONTEXT_PATH}?q=query[&u=user]
     *      query can be: courses (get all courses)
     *                    proposals (get all proposals)
     *                    users (get all users, or get a specific user with u=)
     *                    recent (get recently viewed)
     *      user should be user email
     *
     * POST request format (in body of http request):
     *      q=query&[extra querys &]d=json
     *
     *      query can be: create (create a proposal)
     *                    edituser (edit a user)
     *                    save (edit a proposal)
     *                    delete (delete a proposal)
     *
     * Note: more methods can be easily added to either GET or POST
     *
     * Each time a request is handled it is surrounded in a
     * <code>try/catch</code> block, in order to ensure the server's continued
     * execution no matter if a bad request is processed. In this event, the
     * server simply responds with an HTTP error code and continues serving new
     * requests.
     *
     *
     * @param t the {@link HttpExchange} being handled
     * @throws IOException if sending either response headers or message body
     * is invalid
     */
    
    final private ApcDao dao;
    public ApcController() {
       this.dao = new ApcDao(); 
    }
    
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException {
        try{
            String resp; 
            int status;
            Map<String, String[]> params = request.getParameterMap();
            switch(request.getParameter("q")){
                case "getUser" :
                    try {
                        Principal up = request.getUserPrincipal();
                        String email = up.getName();
                        resp = this.dao.getUser(email);
                        status = STATUS_OK;
                    } catch (Exception ex) {
                        resp = ex.getMessage();
                        status = STATUS_BAD_REQUEST;
                    }
                    break;
                case "courses":
                    try{
                        resp = this.dao.getAll(Collections.COLLECTION_COURSES);
                        status = STATUS_OK;
                    } catch (Exception ex){
                        resp = ex.getMessage();
                        status = STATUS_BAD_REQUEST;
                    }
                    break;
                case "proposals":
                    try{
                        resp = this.dao.getAll(Collections.COLLECTION_PROPOSALS);
                        status = STATUS_OK;
                    } catch (Exception ex){
                        resp = ex.getMessage();
                        status = STATUS_BAD_REQUEST;
                    }
                    break;
                case "users":
                    try{
                        resp = this.dao.getAll(Collections.COLLECTION_USERS);
                        status = STATUS_OK;
                    } catch (Exception ex){
                        resp = ex.getMessage();
                        status = STATUS_BAD_REQUEST;
                    }
                    break;
                case "recent":
                    try{
                        resp = this.dao.getRecentlyViewed(request.getParameter("u"));
                        status = STATUS_OK;
                    } catch (Exception ex){
                        resp = ex.getMessage();
                        status = STATUS_BAD_REQUEST;
                    }
                    break;
                case "departments":
                    try {
                        resp = this.dao.getAll(Collections.COLLECTION_DEPTS);
                        status = STATUS_OK;
                    } catch (Exception ex){
                        resp = "";
                        status = STATUS_BAD_REQUEST;
                    }
                    break;
                case "archiveSearch":
                    try {
                        String searchString = request.getParameter("s");
                        String searchField = request.getParameter("f");
                        resp = this.dao.searchArchives(searchString, searchField);
                        status = STATUS_OK;
                    } catch (Exception ex) {
                        resp = ex.getMessage();
                        status = STATUS_BAD_REQUEST;
                    }
                    break;
                case "archiveGet":
                    try{
                        String searchID = (String) request.getParameter("i");
                        resp = this.dao.getArchive(searchID);
                        status = STATUS_OK;
                    } catch (Exception ex) {
                        resp = ex.getMessage();
                        status = STATUS_BAD_REQUEST;
                    }
                    break;
                case "archiveGetAll":
                    try {
                        resp = this.dao.getAll(Collections.COLLECTION_ARCHIVES);
                        status = STATUS_OK;
                    } catch (Exception ex) {
                        resp = ex.getMessage();
                        status = STATUS_BAD_REQUEST;
                    }
                    break;
                default:
                    status = STATUS_BAD_REQUEST;
                    resp = Json.createObjectBuilder().add("status", "Invalid Query").build().toString();
                    break;
            }
            response.setStatus(status);
            response.getWriter().print(resp);
        } catch (IOException ex) {
            logger.log(Level.SEVERE, ex.getMessage());
            throw new ServletException(ex);
        }
    }
    
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException {
        try {
            Reader reqReader = request.getReader();
            JsonObject data = Json.createReader(reqReader).readObject();
            String resp;

            switch(data.getString("q")){
                case "create":               
                    try{
                        resp = this.dao.createProposal(data);
                        response.setStatus(STATUS_CREATED);
                    } catch (Exception ex){
                        resp = ex.getClass().toString() + ": " +ex.getMessage();
                        response.setStatus(STATUS_BAD_REQUEST);
                    }
                    break;
                case "edituser":
                    try{
                        String user = data.getString("u");
                        JsonObject newUserData = data.getJsonObject("d");
                        resp = this.dao.editUser(user, newUserData);
                        response.setStatus(STATUS_CREATED);
                    } catch (Exception ex){
                        resp = ex.getMessage();
                        response.setStatus(STATUS_BAD_REQUEST);
                    }
                    break;
                case "save":
                    try{
                        resp = this.dao.saveProposal(data);
                    } catch (Exception ex){
                        resp = ex.getMessage();
                        response.setStatus(STATUS_BAD_REQUEST);
                    }
                    break;        
                case "delete":
                    try{
                        resp = this.dao.deleteProposal(data);
                        response.setStatus(STATUS_CREATED);
                    } catch (Exception ex){
                        resp = ex.getMessage();
                        response.setStatus(STATUS_BAD_REQUEST);
                    }
                    break;
                case "archive":
                    try {
                        JsonObject archive;
                        JsonObject prop = data.getJsonObject("d");
                        resp = this.dao.archiveProposal(prop);
                        response.setStatus(STATUS_CREATED);
                    } catch (Exception ex) {
                        resp = ex.getMessage();
                        response.setStatus(STATUS_BAD_REQUEST);
                    }
                    break;
                default:
                    response.setStatus(STATUS_BAD_REQUEST);
                    resp = Json.createObjectBuilder().add("status", "not found").build().toString();
                    break;
            }
            response.getWriter().print(resp);
        } catch (IOException ex) {
            logger.log(Level.SEVERE, ex.getMessage());
            throw new ServletException(ex);
        }
    }
}
