package com.apc_interface.apc_backend;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;
import java.awt.image.BufferedImage;
import java.awt.image.DataBufferByte;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import javax.imageio.ImageIO;

/**
 * Handles all HTTP requests for resources (html, css, and js) but not data. 
 * When HTTP requests are made, they are sent by
 * the {@link ApcBackend} file here, and get parsed and responded to.
 * <p>
 * This class also provides interfacing with a <code>MongoDB</code> database,
 * which is responsible for maintaining and serving all required data.
 *
 * @author Aidan Schmitt
 * @version 1.1
 * @since 1.0_4
 * @see HttpHandler
 */
public class ApcSrcHandler implements HttpHandler{

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
    private static final String METHOD_OPTIONS = "OPTIONS";
    private static final String ALLOWED_METHODS = METHOD_GET + "," + METHOD_OPTIONS;
    
    private static final String path;
    
    static {
        path = ApcBackend.path;
    }

    /**
     * Initializes the server.
     */
    public ApcSrcHandler(){
    }

    /**
     * Handles the HTTP requests for pages.
     * 
     * In order to run on NetBeans, uncomment out the lines in the POST case
     * and comment out the similar lines... The only difference is the different
     * paths. This problem might eventually be fixed by including all the 
     * resources in the jar.
     *
     * @param t the {@link HttpExchange} being handled
     * @throws IOException if sending either response headers or message body
     * is invalid
     */
    @Override
    public void handle(HttpExchange t) throws IOException {
        try{
            final Headers headers = t.getResponseHeaders();
            headers.set("Access-Control-Allow-Origin", "*");
            headers.set("Access-Control-Allow-Credentials", "true");
            headers.set("Connection", "keep-alive");
            final String requestMethod = t.getRequestMethod().toUpperCase();
            switch(requestMethod){
                case METHOD_GET:
                    String request = t.getRequestURI().getPath().substring(5);

                    String response;
                    byte[] responseBytes = null;
                    int status = 0;
                    
                    if (request.endsWith("home")) {
                        status = STATUS_OK;
                        //response = loadFile("../../index.html");
                        response = loadFile("index.html");
                        headers.set(HEADER_CONTENT_TYPE, "text/html; charset=utf-8");
                        responseBytes = response.getBytes();
                    } else if (request.endsWith(".html")) {
                        status = STATUS_OK;
                        //response = loadFile("../../" + request);
                        response = loadFile(request);
                        headers.set(HEADER_CONTENT_TYPE, "text/html; charset=utf-8");
                        responseBytes = response.getBytes();
                    } else if (request.endsWith(".css")){ 
                        status = STATUS_OK;
                        //response = loadFile("../../" + request);
                        response = loadFile(request);
                        headers.set(HEADER_CONTENT_TYPE, "text/css; charset=utf-8");
                        responseBytes = response.getBytes();
                    } else if (request.endsWith(".js")) {
                        status = STATUS_OK;
                        //response = loadFile("../../" + request);
                        response = loadFile(request);
                        headers.set(HEADER_CONTENT_TYPE, "application/javascript; charset=utf-8");
                        responseBytes = response.getBytes();
                    } else if (request.endsWith(".png")){
                        status = STATUS_OK;
                        headers.set(HEADER_CONTENT_TYPE, "image/png");
                        //responseBytes = loadImage("../../" + request);
                        responseBytes = loadImage(request);
                    } else if (request.endsWith(".map")) {
                        status = STATUS_NO_CONTENT; //no content
                        //headers.set(HEADER_CONTENT_TYPE, "application/octet-stream");
                        //response = loadFile("../../" + request);
                        //responseBytes = response.getBytes();//what is going on with this?
                        responseBytes = new byte[0];
                    } else if (request.endsWith(".woff")) {
                        try{
                            status = STATUS_OK;
                            headers.set(HEADER_CONTENT_TYPE, "application/font-woff");
                            responseBytes = readFileAsByteArray(request);
                        } catch (IOException ex) {
                            status = STATUS_BAD_REQUEST;
                            responseBytes = new byte[0];
                        }
                    } else {
                        status = STATUS_BAD_REQUEST;
                        response = "";
                        responseBytes = response.getBytes();
                    }
                    t.sendResponseHeaders(status, responseBytes.length);
                    OutputStream os = t.getResponseBody();
                    os.write(responseBytes);
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
    
    private String loadFile(String p) throws IOException{
        Path path = Paths.get(p);
        StringBuilder builder = new StringBuilder();
        try (Scanner scan = new Scanner(path, "UTF-8")){
            while (scan.hasNextLine()){
                builder.append(scan.nextLine());
                builder.append("\n");
            }
        }
        return builder.toString();
    }
    
    private byte[] loadImage(String p) throws IOException {
        File path = new File(p);
        BufferedImage img = ImageIO.read(path);
        ByteArrayOutputStream baos = new ByteArrayOutputStream(1000);
        ImageIO.write(img, "png", baos);
        baos.flush();
        byte[] array = baos.toByteArray();
        baos.close();
        return array;
    }
    
    private byte[] readFileAsByteArray(String p) throws IOException {
        Path path = Paths.get(p);
        return Files.readAllBytes(path);
    }
}
