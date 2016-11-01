package com.apc_interface.apc_backend;

import com.mongodb.Block;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoDatabase;
import static com.mongodb.client.model.Filters.eq;
import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import org.bson.Document;
import org.bson.types.ObjectId;

/**
 * Handles all HTTP requests. When HTTP requests are made, they are sent by
 * the {@link ApcBackend} file here, and get parsed and responded to.
 * <p>
 * This class also provides interfacing with a <code>MongoDB</code> database,
 * which is responsible for maintaining and serving all required data.
 *
 * @author Aidan Schmitt
 * @version 1.0_3
 * @since 1.0_1
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
     * TODO implement HTTP PUT method as an alternative for POSTing some things
     *
     * @param t the {@link HttpExchange} being handled
     * @throws IOException if sending either response headers or message body
     * is invalid
     */
    @Override
    public void handle(HttpExchange t) throws IOException {
        try{
            final Headers headers = t.getResponseHeaders();
            headers.add("Access-Control-Allow-Origin", "*");
            headers.add("Access-Control-Allow-Credentials", "true");
            final String requestMethod = t.getRequestMethod().toUpperCase();
            switch(requestMethod){
                case METHOD_GET:
                    Map<String, String> params = parseQuery(t.getRequestURI().getQuery());

                    String response;
                    int status;

                    switch(params.get("q")){
                        case "courses":
                            try{
                                response = this.getAll(COLLECTION_COURSES);
                                status = STATUS_OK;
                            } catch (Exception ex){
                                response = "";
                                status = STATUS_BAD_REQUEST;
                            }
                            break;
                        case "proposals":
                            try{
                                response = this.getAll(COLLECTION_PROPOSALS);
                                status = STATUS_OK;
                            } catch (Exception ex){
                                response = "";
                                status = STATUS_BAD_REQUEST;
                            }
                            break;
                        case "users":
                            try{
                                if (params.containsKey("u")){
                                    response = this.getUser(params.get("u"));
                                } else {
                                    response = this.getAll(COLLECTION_USERS);
                                }
                                status = STATUS_OK;
                            } catch (Exception ex){
                                response = "";
                                status = STATUS_BAD_REQUEST;
                            }
                            break;
                        case "recent":
                            try{
                                response = this.getRecentlyViewed(params.get("u"));
                                status = STATUS_OK;
                            } catch (Exception ex){
                                response = "";
                                status = STATUS_BAD_REQUEST;
                            }
                            break;
                        default:
                            status = STATUS_BAD_REQUEST;
                            response = "";
                            break;
                    }
                    
                    byte[] responseBytes = response.getBytes();
                    t.sendResponseHeaders(status, responseBytes.length);
                    OutputStream os = t.getResponseBody();
                    os.write(responseBytes);
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

                    Document doc = Document.parse(params.get("d"));

                    switch(params.get("q")){
                        case "create":
                            try{
                                db.getCollection(COLLECTION_PROPOSALS).insertOne(doc);
                                response = "{status: success, method: create}";
                                status = STATUS_CREATED;
                            } catch (Exception ex){
                                response = "";
                                status = STATUS_BAD_REQUEST;
                            }
                            break;
                        case "edituser":
                            try{
                                String user = params.get("u");
                                db.getCollection(COLLECTION_USERS).updateOne(eq("email", user), new Document("$set", doc));
                                status = STATUS_CREATED;
                                response = "{status: success, method: edituser}";
                            } catch (Exception ex){
                                response = "";
                                status = STATUS_BAD_REQUEST;
                            }
                            break;
                        case "save":
                            try{
                                System.out.println("Saving Proposal");
                                Document idDoc = (Document)doc.get("_id");
                                String id = idDoc.getString("");
                                doc.remove("_id");
                                db.getCollection(COLLECTION_PROPOSALS).updateOne(eq("_id", new ObjectId(id)), new Document("$set", doc));
                                status = STATUS_CREATED;
                                response = "{status: success, method: save}";
                            } catch (Exception ex){
                                response = "";
                                status = STATUS_BAD_REQUEST;
                            }
                            break;
                        case "delete":
                            //doc could be entire document, or just part of one I think
                            try{
                                db.getCollection(COLLECTION_PROPOSALS).deleteOne(doc);
                                status = STATUS_CREATED;
                                response = "{status: success, method: delete}";
                            } catch (Exception ex){
                                response = "";
                                status = STATUS_BAD_REQUEST;
                            }
                            break;
                        default:
                            status = STATUS_BAD_REQUEST;
                            response = "{status: not found}";
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
    private String getRecentlyViewed(String user){

        final StringBuilder json = new StringBuilder();
        json.append("{");

        FindIterable iterable = db.getCollection(COLLECTION_USERS).find(eq("email", user));

        iterable.forEach(new Block<Document>(){
            @Override
            public void apply(final Document document){
                ArrayList<String> list = null;
                list = document.get("recent", ArrayList.class);

                for (int i = 0; i < list.size(); i++){
                    FindIterable iter = db.getCollection(COLLECTION_PROPOSALS).find(eq("_id", new ObjectId(list.get(i))));
                    iter.forEach(new Block<Document>(){
                        @Override
                        public void apply(final Document doc){
                            json.append(doc.toJson());
                        }
                    });

                    iter = db.getCollection(COLLECTION_COURSES).find(eq("_id", new ObjectId(list.get(i))));
                    iter.forEach(new Block<Document>(){
                        @Override
                        public void apply(final Document doc){
                            json.append(doc.toJson());
                        }
                    });
                }
            }
        });

        json.append("}");

        return json.toString();
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
     * Handle HTTP GET request for a specific user. Note that this will return
     * all users with the same email address, so care should be taken to avoid
     * duplicate emails.
     *
     * @param email the email of the intended user
     * @return a JSON formatted string of the user's data
     */
    private String getUser(String email){
        final StringBuilder json = new StringBuilder();
        FindIterable iterable = db.getCollection(COLLECTION_USERS).find(eq("email", email));

        iterable.forEach(new Block<Document>() {
           @Override
           public void apply(final Document document){
               json.append(document.toJson());
           }
        });

        return json.toString();
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
