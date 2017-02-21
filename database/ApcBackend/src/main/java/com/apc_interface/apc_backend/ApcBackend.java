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
 * @version 1.1
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
    private static final int PORT = 8000;
    
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
    private static final String DATA_CONTEXT_PATH = "/data";
    
    /**
     * The context path for retrieving source files, such as HTML files.
     */
    private static final String SRC_CONTEXT_PATH = "/src";
    
    public static String path = "";
    
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
        
        //read command line arguments
        if (args.length > 0) {
            switch(args[0]) {
                case "-p":
                case "--path":
                    try {
                        path = args[1];
                    } catch (NullPointerException ex) {
                        System.err.println("Usage: -p <pathname>\nwhere pathname is the relative path to the main directory of files");
                        System.exit(0);
                    }
                    break;
                case "-h":
                case "--help":
                    String output = "";
                    output += "Usage: apcBackend.jar [options] [parameters]\n";
                    output += "List of options:\n";
                    output += "-h, --help: list this help menu";
                    output += "-p, --path: specify specific path to files";
                    System.exit(0);
                    break;
                default:
                    System.err.println("Argument not supported, try -h for options.");
                    System.exit(0);
                    break;
            }
        }
        
        HttpServer server = HttpServer.create(new InetSocketAddress(PORT), BACKLOG);
        server.createContext(DATA_CONTEXT_PATH, new ApcHandler());
        server.createContext(SRC_CONTEXT_PATH, new ApcSrcHandler());
        server.setExecutor(null);
        server.start();
    }   
}