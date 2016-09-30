package com.apc_interface.apc_backend;

import com.mongodb.Block;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoDatabase;
import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
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
     * TODO Currently, only GET is implemented, and only one of the GET related
     * methods is being implemented. More functionality to come!
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
                    //TODO Implement rest of the HTTP GET requests
                    String response = this.getAllCourses();
                    t.sendResponseHeaders(STATUS_OK, response.length());
                    OutputStream os = t.getResponseBody();
                    os.write(response.getBytes());
                    os.close();
                    break;
                case METHOD_POST:
                    // TODO implement HTTP POST requests
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
     * Handle HTTP GET request for all proposals.
     */
    private void getAllProposals(){
        //TODO implement functionality
    }

    /**
     * Handle HTTP GET request for recently viewed proposals or courses.
     */
    private void getRecentlyViewed(){
        //TODO implement functionality
    }

    /**
     * Handle HTTP GET request for all courses.
     * 
     * @return a <code>JSON</code> representation of all courses in the database
     */
    private String getAllCourses(){
        final StringBuilder json = new StringBuilder();
        FindIterable iterable = db.getCollection("courses").find();

        iterable.forEach(new Block<Document>() {
            @Override
            public void apply(final Document document){
                json.append(document.toJson());
            }
        });

        return json.toString();
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
}