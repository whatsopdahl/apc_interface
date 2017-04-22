package com.apc.luthercourseproposal;

import java.util.Hashtable;
import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attributes;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;
import javax.naming.ldap.InitialLdapContext;
import javax.naming.ldap.LdapContext;
import javax.naming.directory.Attribute;

/**
 *
 * @author Jonathan Opdahl
 */
public class ApcUser {
    
    private LdapContext ldapCtx;
    private SearchControls searchCtrls;
    
    ApcUser() {
        this.ldapCtx = getLdapContext();
        this.searchCtrls = getSearchControls();
    }
    
    private static LdapContext getLdapContext() {
        LdapContext ctx = null;
        try {
            Hashtable<String, String> env = new Hashtable<String, String>();
            env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
            env.put(Context.SECURITY_AUTHENTICATION, "Simple");
            env.put(Context.SECURITY_PRINCIPAL, "CN=apc,OU=Vendor,DC=lc,DC=luther,DC=edu");//input user & password for access to ldap
            env.put(Context.SECURITY_CREDENTIALS, "72455&TMFbgL4");
            env.put(Context.PROVIDER_URL, "ldap://dc-1.lc.luther.edu:3268");
            ctx = new InitialLdapContext(env, null);
        }catch (NamingException e) {
            System.err.println(e.getMessage());
            System.err.print(e.getStackTrace());
        }
        return ctx;
    }
    
    private static SearchControls getSearchControls() {
        SearchControls cons = new SearchControls();
        cons.setSearchScope(SearchControls.SUBTREE_SCOPE);
        String[] attrIDs = {"distinguishedName", "displayName"};
        cons.setReturningAttributes(attrIDs);
        return cons;
    }
    
    public String getUserName(String email) {
        String displayName = null;
        try {
            NamingEnumeration<SearchResult> answer = this.ldapCtx.search("dc=lc,dc=luther,dc=edu", "cn=" + email, this.searchCtrls);
            if (answer.hasMore()) {
                Attributes attrs = answer.next().getAttributes();
                displayName = attrs.get("displayName").toString().split(":")[1].trim();
            } else {
                System.out.println("user not found.");
            }
        } catch (Exception ex) {
        }
        return displayName;
    }
}
