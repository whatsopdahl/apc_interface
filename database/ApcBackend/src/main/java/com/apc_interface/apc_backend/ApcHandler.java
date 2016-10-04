package com.apc_interface.apc_backend;

import com.mongodb.Block;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoDatabase;
import com.mongodb.util.JSON;
import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import org.bson.Document;

/**
 * Handles all HTTP requests. When HTTP requests are made, they are sent by
 * the {@link ApcBackend} file here, and get parsed and responded to.
 * <p>
 * This class also provides interfacing with a <code>MongoDB</code> database, 
 * which is responsible for maintaining and serving all required data.
 * 
 * @author Aidan Schmitt
 * @see HttpHandler
 * @see MongoDatabase
 * @see MongoClient
 */
public class ApcHandler implements HttpHandler{
    
    /**
     * The name of the database stored in the MongoDB server.
     */
    private static final String DB_NAME = "apcdata";
    
    /**
     * String finals for the names of the different collections in the database.
     */
    private static final String COLLECTION_COURSES = "courses";
    private static final String COLLECTION_USERS = "users";
    private static final String COLLECTION_PROPOSALS = "proposals";
    
    /**
     * An object representation of the MongoDB database.
     */
    private MongoDatabase db;
    
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
     * STATUS_OKAY (200) everything normal.
     * STATUS_METHOD_NOT_ALLOWED (405) requested an invalid method
     *  (GET, POST, and OPTIONS are only valid options)
     */
    private static final int STATUS_OK = 200;
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
    
    /**
     * Initializes the reference to the database hosted on the MongoDB server.
     */
    public ApcHandler(){
        MongoClient client = new MongoClient();
        db = client.getDatabase(DB_NAME);
    }
    
    /**
     * Handles the HTTP requests. Switches based on method type, and handles
     * each method differently. If an invalid method is used, it sends a 405
     * error and tells the client which methods are available.
     * <p>
     * GET request format: 
     *      apc.url.luther.edu/{@link ApcBackend.CONTEXT_PATH}?q=query
     *      query can be: courses (get all courses)
     *                    proposals (get all proposals)
     *                    recent (get recently viewed)
     * 
     * POST request format (in body of http request):
     *      q=query&[extra querys &]d=json
     * 
     * @param t the {@link HttpExchange} being handled
     * @throws IOException if sending either response headers or message body
     * is invalid
     */
    @Override
    public void handle(HttpExchange t) throws IOException {
        try{
            final Headers headers = t.getResponseHeaders();
            final String requestMethod = t.getRequestMethod().toUpperCase();
            switch(requestMethod){
                case METHOD_GET:
                    Map<String, String> params = parseQuery(t.getRequestURI().getQuery());
                    
                    String response = "";
                    int status = -1;
                    
                    switch(params.get("q")){
                        case "courses":
                            response = this.getAllCourses();
                            status = STATUS_OK;
                            break;
                        case "proposals":
                            response = this.getAllProposals();
                            status = STATUS_OK;
                            break;
                        case "recent":
                            response = "NOT IMPLEMENTED YET";
                            status = STATUS_NOT_FOUND;
                            //add array to db for recently viewed things
                            //get ids from user collection
                            break;
                        default:
                            status = STATUS_NOT_FOUND;
                            response = "Not Found";
                            break;
                    }
                    
                    t.sendResponseHeaders(status, response.length());
                    OutputStream os = t.getResponseBody();
                    os.write(response.getBytes());
                    os.close();
                    break;
                case METHOD_POST:
                    InputStreamReader isr = new InputStreamReader(t.getRequestBody(), "utf-8");
                    BufferedReader br = new BufferedReader(isr);
                    
                    int b;
                    StringBuilder buf = new StringBuilder(512);
                    while((b = br.read()) != -1){
                        buf.append((char) b);
                    }
                    
                    br.close();
                    isr.close();
                    
                    params = parseQuery(buf.toString());
                    
                    response = "";
                    status = -1;
                    
                    switch(params.get("q")){
                        case "create":
                            Document doc = Document.parse(params.get("d"));
                            db.getCollection(COLLECTION_PROPOSALS).insertOne(doc);
                            response = "{status: success}";
                            status = STATUS_OK;
                            break;
                        case "edituser":
                            status = STATUS_NOT_FOUND;
                            response = "Not Implemented Yet";
                            break;
                        case "save":
                            status = STATUS_NOT_FOUND;
                            response = "Not Implemented Yet";
                            break;
                        case "delete":
                            status = STATUS_NOT_FOUND;
                            response = "Not Implemented Yet";
                            break;
                        default:
                            status = STATUS_NOT_FOUND;
                            response = "Not Found";
                            break;
                    }
                    
                    t.sendResponseHeaders(status, response.length());
                    os = t.getResponseBody();
                    os.write(response.getBytes());
                    os.close();
                    
                    break;
                case METHOD_OPTIONS:
                    headers.set(HEADER_ALLOW, ALLOWED_METHODS);
                    t.sendResponseHeaders(STATUS_OK, NO_RESPONSE_LENGTH);
                    break;
                default:
                    headers.set(HEADER_ALLOW, ALLOWED_METHODS);
                    t.sendResponseHeaders(STATUS_METHOD_NOT_ALLOWED, NO_RESPONSE_LENGTH);
                    break;
            }
        } finally {
            t.close();
        }
    }

    /**
     * Handle HTTP GET request for recently viewed proposals or courses.
     */
    private void getRecentlyViewed(){
        //TODO implement functionality
    }

    /**
     * Handle HTTP GET request for all documents in a given collection. 
     * Initiates a database query that returns all <code>Document</code>s in a
     * given collection, and parses them into JSON text.
     * 
     * @param collection the collection to retrieve documents from
     * @return a <code>JSON</code> representation of all courses in the database
     */
    private String getAll(String collection){
        final StringBuilder json = new StringBuilder();
        FindIterable iterable = db.getCollection(collection).find();

        iterable.forEach(new Block<Document>() {
            @Override
            public void apply(final Document document){
                json.append(document.toJson());
            }
        });

        return json.toString();
    }
    
    /**
     * Helper function to get all courses.
     * 
     * @return a JSON representation of all courses
     */
    private String getAllCourses(){
        return getAll(COLLECTION_COURSES);
    }
    
    /**
     * Helper function to get all proposals.
     * 
     * @return a JSON representation of all proposals
     */
    private String getAllProposals(){
        return getAll(COLLECTION_PROPOSALS);
    }

    /**
     * Handle HTTP POST request to create a proposal.
     */
    private void postCreateProposal(){
        //TODO implement functionality
    }

    /**
     * Handle HTTP POST request to edit a user profile entry.
     */
    private void postEditUser(){
        //TODO implement functionality
    }

    /**
     * Handle HTTP POST request to save a proposal.
     */
    private void postSaveProposal(){
        //TODO implement functionality
    }

    /**
     * Handle HTTP POST request to delete a proposal from the database.
     */
    private void postDeleteProposal(){
        //TODO implement functionality
    }
    
    /**
     * Parses an HTTP GET query into a map (dictionary) of params:values.
     * 
     * @param query a string containing the GET query
     * @return a map of key-value pairings of parameters and values
     */
    public Map<String, String> parseQuery(String query){
        Map<String, String> result = new HashMap();
        for (String param : query.split("&")){
            String[] pair = param.split("=");
            if (pair.length>1){
                result.put(pair[0], pair[1]);
            } else {
                result.put(pair[0], "");
            }
        }
        return result;
    }
}