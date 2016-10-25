package com.apc_interface.apc_backend;

import java.net.InetSocketAddress;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;

/**
 *
 * The Main class for the APC Project backend server. This server accepts
 * both GET and POST HTTP requests containing either JSON or requests for
 * JSON, processes them and either updates a MongoDB database or returns
 * JSON.
 * <p>
 * This class creates an {@link HttpServer} from host <code>HOST</code>
 * and port <code>Port</code>.
 * 
 * @author Aidan Schmitt
 * @version 1.0_2
 * @since 1.0_1
 * @see ApcHandler
 */
public class ApcBackend {
    
    /*
     * The host name of the server.
     */
    private static final String HOSTNAME = "localhost";
    
    /**
     * The port number to connect to.
     */
    private static final int PORT = 8080;
    
    /**
     * The backlog of requests allowed to the server. Set to 1, and it shouldn't
     * need to be higher?
     */
    private static final int BACKLOG = 1;
    
    /**
     * The directory path to navigate to in order to access this server.
     * With host localhost and port 8080, the path would be 
     * localhost:8080/CONTEXT_PATH
     */
    private static final String CONTEXT_PATH = "/data";
    
    /**
     * Creates, initializes and starts the <code>HttpServer</code> at the 
     * location <code>HOSTNAME:PORT/test</code>
     * 
     * @param args command-line arguments
     * @throws IOException if the address at <code>HOSTNAME,PORT</code> is 
     * invalid or cannot be connected to
     * @see ApcHandler
     */
    public static void main(String[] args) throws IOException{
        HttpServer server = HttpServer.create(new InetSocketAddress(HOSTNAME, PORT), BACKLOG);
        server.createContext(CONTEXT_PATH, new ApcHandler());
        server.setExecutor(null);
        server.start();
    }   
}