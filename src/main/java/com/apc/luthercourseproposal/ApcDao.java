package com.apc.luthercourseproposal;

import com.mongodb.BasicDBObject;
import com.mongodb.Block;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import static com.mongodb.client.model.Filters.eq;
import java.io.StringReader;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.StringJoiner;
import java.util.regex.Pattern;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.json.JsonValue;
import org.bson.Document;
import org.bson.json.JsonParseException;
import org.bson.types.ObjectId;

/**
 * This class is the Data Access Object class for Luther Course Proposal application. 
 * It implements all database calls from the front end. 
 * @author Jonathan Opdahl
 */
public class ApcDao {
    /**
     * The name of the database stored in the MongoDB server.
     */
    private static final String DB_NAME = "apcdata";

    public enum Collections {
        COLLECTION_COURSES("courses"),
        COLLECTION_USERS("users"),
        COLLECTION_PROPOSALS("proposals"),
        COLLECTION_DEPTS("depts"),
        COLLECTION_ARCHIVES("archives");
        
        private String name;
        
        Collections(String name) {
            this.name = name;
        }
        
        @Override
        public String toString() {
            return this.name;
        }
    }

    /**
     * An object representation of the MongoDB database.
     */
    final private MongoDatabase db;
    
    /**
     * Initializes the reference to the database hosted on the MongoDB server.
     */
    public ApcDao() {
        MongoClient client = new MongoClient();
        db = client.getDatabase(DB_NAME);
    }
    
    /**
     * Returns a JsonObject String of the recently viewed courses/proposals/archives.
     */
    public String getRecentlyViewed(String user){

        final StringBuilder json = new StringBuilder();
        json.append("{");

        FindIterable iterable = db.getCollection(Collections.COLLECTION_USERS.toString()).find(eq("email", user));

        iterable.forEach(new Block<Document>(){
            @Override
            public void apply(final Document document){
                ArrayList<String> list;
                list = document.get("recent", ArrayList.class);

                for (int i = 0; i < list.size(); i++){
                    FindIterable iter = db.getCollection(Collections.COLLECTION_PROPOSALS.toString()).find(eq("_id", new ObjectId(list.get(i))));
                    iter.forEach(new Block<Document>(){
                        @Override
                        public void apply(final Document doc){
                            json.append(doc.toJson());
                        }
                    });

                    iter = db.getCollection(Collections.COLLECTION_COURSES.toString()).find(eq("_id", new ObjectId(list.get(i))));
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
    
    public String createProposal(JsonObject proposal) throws Exception {
        JsonObjectBuilder successObj = Json.createObjectBuilder();
        successObj.add("status", "success");
        String newCourse = proposal.get("newCourse").toString();
        Document course = Document.parse(newCourse);
        db.getCollection(Collections.COLLECTION_COURSES.toString()).insertOne(course);
        JsonObject newCourseWid = this.getCourse(newCourse);
        JsonObjectBuilder newProp = Json.createObjectBuilder();
        for (String key : proposal.keySet()) {
            if (key.equalsIgnoreCase("newCourse")) {
                newProp.add("newCourse", newCourseWid);
            } else {
                newProp.add(key, proposal.get(key));
            }
        }
        Document doc = Document.parse(newProp.build().toString());
        db.getCollection(Collections.COLLECTION_PROPOSALS.toString()).insertOne(doc);
        successObj.add("method", "create proposal");
        return successObj.build().toString();
    }
    
       /**
     * Handle HTTP GET request for all documents in a given collection.
     * Initiates a database query that returns all <code>Document</code>s in a
     * given collection, and parses them into JSON text.
     *
     * @param collection the collection to retrieve documents from
     * @return a <code>JSON</code> representation of all courses in the database
     */
    public String getAll(Collections collection){
        final StringBuilder json = new StringBuilder();
        FindIterable iterable = db.getCollection(collection.toString()).find();

        json.append("[");
        
        iterable.forEach(new Block<Document>() {
            @Override
            public void apply(final Document document){
                json.append(document.toJson());
                json.append(",");
            }
        });
        
        //delete last "," in string
        if (json.length() > 1) json.deleteCharAt(json.length()-1);
        json.append("]");

        return json.toString();
    }

    /**
     * Primarily used to get the course just inserted into the database when we 
     * create a new proposal so we can get the object id. 
     * 
     * @param course course to filter on
     * @return a JsonObject of 
     */
    public JsonObject getCourse(String course) throws Exception{
        JsonObject json = null;
        FindIterable find = db.getCollection(Collections.COLLECTION_COURSES.toString()).find(BasicDBObject.parse(course));
        
        try (MongoCursor<Document> cursor = find.iterator()) {
            if (cursor.hasNext()){
                Document doc = cursor.next();
                
                JsonReader reader = Json.createReader(new StringReader(doc.toJson()));
                
                json = reader.readObject();
            }
        } catch(Exception e) {
            throw e;
        }
        if (json == null) {
            throw new Exception("Course not found.");
        }
        return json;
    }
    
    public String editUser(String user, JsonObject data) throws Exception {
        Document doc = parseDocument(data.toString());
        JsonObjectBuilder successObj = buildSuccessObj("edit user");
        db.getCollection(Collections.COLLECTION_USERS.toString()).updateOne(eq("email", user), new Document("$set", doc));
        return successObj.build().toString();
    }
    
    private void addUser(JsonObject data) throws Exception {
        db.getCollection(Collections.COLLECTION_USERS.toString()).insertOne(parseDocument(data.toString()));
    }
    
    
    public String saveProposal(JsonObject prop) throws Exception {
        JsonObjectBuilder successObj = buildSuccessObj("save proposal");
        JsonObject idObj = prop.getJsonObject("_id");
        JsonObject course = prop.getJsonObject("newCourse");
        String courseId = course.getJsonObject("_id").getString("$oid");
        Document doc = Document.parse(course.toString());
        db.getCollection(Collections.COLLECTION_COURSES.toString()).updateOne(eq("_id", new ObjectId(courseId)), new Document("$set", doc));
        String id = idObj.getString("$oid");
        doc = Document.parse(prop.toString());        
        db.getCollection(Collections.COLLECTION_PROPOSALS.toString()).updateOne(eq("_id", new ObjectId(id)), new Document("$set", doc));
        return successObj.build().toString();
    }
    
    public String deleteProposal(JsonObject data) throws Exception {
        JsonObjectBuilder successObj = buildSuccessObj("delete proposal");
        Document doc = parseDocument(data.toString());
        JsonObject newCourse = data.getJsonObject("newCourse");
        Document course = Document.parse(newCourse.toString());
        db.getCollection(Collections.COLLECTION_COURSES.toString()).deleteOne(course);
        db.getCollection(Collections.COLLECTION_PROPOSALS.toString()).deleteOne(doc);
        return successObj.build().toString();
    }
    
    /**
     * Helper method that builds a success object for a given POST method. 
     * @param method
     * @return 
     */
    private JsonObjectBuilder buildSuccessObj(String method) {
        return Json.createObjectBuilder().add("status","success").add("method", method);
    }
    
    /**
     * Takes in a string of json data and parses it into a mongo db document. 
     * @param data
     * @return
     * @throws JsonParseException 
     */
    private Document parseDocument(String data) throws JsonParseException{
        Document doc = null;
        if (data != null){
            doc = Document.parse(data);
        } else {
            throw new JsonParseException("Could not read Data");       
        }  
        if (doc == null) {
            throw new JsonParseException("No data found");
        }
        return doc;
    }
    /**
     * Handle HTTP GET request for a specific user. Note that this will return
     * all users with the same email address, so care should be taken to avoid
     * duplicate emails.
     *
     * @param email the email of the intended user
     * @return a JSON formatted string of the user's data
     */
    public String getUser(String email, String name, JsonArray roles) throws Exception{
        final StringBuilder json = new StringBuilder();
        email = email+"@luther.edu";
        FindIterable iterable = db.getCollection(Collections.COLLECTION_USERS.toString()).find(eq("email", email));
        
        iterable.forEach(new Block<Document>() {
           @Override
           public void apply(final Document document){
               json.append(document.toJson());
           }
        });
        
        if (json.length() == 0) {
            JsonObjectBuilder user = Json.createObjectBuilder();
            user.add("email", email);
            user.add("name", name);
            user.add("recentlyViewed", Json.createArrayBuilder().build());
            user.add("dept",Json.createArrayBuilder().build());
            user.add("division", Json.createArrayBuilder().build());
            JsonObject userObj = user.build();
            addUser(userObj);
            user.add("role", roles);
            return user.build().toString();
        }
        StringReader in = new StringReader(json.toString());
        JsonReader read = Json.createReader(in);
        JsonObject obj = read.readObject();
        JsonObjectBuilder res = Json.createObjectBuilder();
        for (String key : obj.keySet()) {
            res.add(key, obj.get(key));
        }
        res.add("role", roles);
        return res.build().toString();
    }
    
    /**
     * Queries the archive collection and returns a string containing the JSON 
     * response.
     * 
     * Search fields include title, name, owner, and (year) implemented.
     * 
     * @param query the search query from the front-end
     * @param field the field in the collection to search from, e.g. title
     * @return a JSON String representation of the search results
     * @throws java.lang.Exception if the search field is invalid.
     */
    public String searchArchives(String query, String field) throws Exception{
        final StringBuilder response = new StringBuilder();
        final Map<String, String> responses = new HashMap();
        
        String searchField = "proposals.";
        switch(field){
            case "title":
            case "name":
                searchField += "newCourse.";
                break;
            case "year": //NOT IMPLEMENTED YET
            case "owner":
                break;
            default:
                throw new Exception("Invalid archive search field");
        }
        searchField += field;
        for (String q: query.split("\\+")){
            BasicDBObject searchObject = new BasicDBObject(searchField, Pattern.compile(q));
            FindIterable iterable = db.getCollection(Collections.COLLECTION_ARCHIVES.toString()).find(searchObject);
            iterable.forEach(new Block<Document>() {
                @Override
                public void apply(final Document document) {
                    String ans = document.get("_id").toString();
                    if (!responses.containsKey(ans)){
                        responses.put(ans, document.toJson());
                    }
                }
            });
        }
        
        response.append("[");
        StringJoiner sj = new StringJoiner(", ");
        for(Map.Entry<String, String> entry: responses.entrySet()){
            sj.add(entry.getValue());
        }
        response.append(sj.toString());
        response.append("]");
        
        return response.toString();
    }
    
    /**
     * Searches the archives by the lastCourseID and returns as a document a
     * single archive. Note that the search still returns an iterator, but as
     * the courseID's are unique (and that there's no simple findOne method)
     * this should work as if a findOne method had been called.
     * 
     * @param lastCourseID the ID of the last course of the archive
     * @return a JSON document containing the relevant archive
     * @throws java.lang.Exception if the lastCourseID isn't in the database
     */
    public String getArchive(final String lastCourseID) throws Exception{
        System.out.println("[info] searching for archive " + lastCourseID);
        BasicDBObject searchObject = new BasicDBObject("curr_course", lastCourseID);
        FindIterable iterable = db.getCollection(Collections.COLLECTION_ARCHIVES.toString()).find(searchObject);
        final StringBuilder builder = new StringBuilder();
        iterable.forEach(new Block<Document>() {
            @Override
            public void apply(final Document document) {
                try {
                    builder.append(document.toJson());
                } catch (Exception ex) {
                    // curr_case == null; ignore.
                }
                
            }
        });
        
        if (builder.length() == 0) {
            JsonObject res = Json.createObjectBuilder()
                                .add("msg", "No archive available for this course.")
                                .build();
            return res.toString();
        }
        return builder.toString();
    }

    public String archiveProposal(JsonObject proposal) { 
        JsonObject archive;
        JsonObjectBuilder successObj = buildSuccessObj("archive proposal");
        if (proposal.isNull("oldCourse")) {
            //no old course, create new archive
            JsonObjectBuilder builder = Json.createObjectBuilder();
            builder.add("proposals", Json.createArrayBuilder()
                    .add(proposal).build());
            builder.add("curr_course", proposal.getJsonObject("newCourse").getJsonObject("_id").getString("$oid"));
            archive = builder.build();
            db.getCollection(Collections.COLLECTION_ARCHIVES.toString()).insertOne(Document.parse(archive.toString()));
        } else {
            //old course and existing archives
            //get archive by old course id, then $push new prop to that archive
            Document idDoc = parseDocument(proposal.getJsonObject("oldCourse").getJsonObject("_id").getString("$oid"));
            BasicDBObject newDoc = (BasicDBObject) new BasicDBObject().put("$push", proposal);
            db.getCollection(Collections.COLLECTION_ARCHIVES.toString()).findOneAndUpdate(idDoc, newDoc);
        }
        try {
            Document doc = parseDocument(proposal.toString());
            db.getCollection(Collections.COLLECTION_PROPOSALS.toString()).deleteOne(doc); 
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return successObj.build().toString();
    }
}
