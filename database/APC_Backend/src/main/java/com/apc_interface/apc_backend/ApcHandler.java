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
 *
 * @author aidan
 */
public class ApcHandler implements HttpHandler{
    private static final String DB_NAME = "apcdata";
    private MongoDatabase db;
    
    private static final String HEADER_ALLOW = "Allow";
    private static final String HEADER_CONTENT_TYPE = "Content-Type";
    
    private static final Charset CHARSET = StandardCharsets.UTF_8;
    
    private static final int STATUS_OK = 200;
    private static final int STATUS_METHOD_NOT_ALLOWED = 405;
    
    private static final int NO_RESPONSE_LENGTH = -1;
    
    private static final String METHOD_GET = "GET";
    private static final String METHOD_POST = "POST";
    private static final String METHOD_OPTIONS = "OPTIONS";
    private static final String ALLOWED_METHODS = METHOD_GET + "," + METHOD_POST + "," + METHOD_OPTIONS;
    
    public ApcHandler(){
        MongoClient client = new MongoClient();
        db = client.getDatabase(DB_NAME);
    }
    
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
        
    private void getAllProposals(){

    }

    private void getRecentlyViewed(){

    }

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

    private void postCreateProposal(){

    }

    private void postEditUser(){

    }

    private void postSaveProposal(){

    }

    private void postDeleteProposal(){

    }
}
