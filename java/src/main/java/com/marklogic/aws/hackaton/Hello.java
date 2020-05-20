package com.marklogic.aws.hackaton;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.marklogic.client.DatabaseClient;
import com.marklogic.client.DatabaseClientFactory;
import com.marklogic.client.document.JSONDocumentManager;
import com.marklogic.client.io.StringHandle;

import javax.net.ssl.SSLContext;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

public class Hello implements RequestHandler<Map<String,String>, String>{

    Gson gson = new GsonBuilder().setPrettyPrinting().create();
    @Override
    public String handleRequest(Map<String,String> event, Context context)
    {
        final String mlUsername="dhs-2-admin";
        final String mlPassword="97&75e$jBJqv";

        LambdaLogger logger = context.getLogger();
        String response = new String("200 OK");
        // log execution details
        logger.log("ENVIRONMENT VARIABLES: " + gson.toJson(System.getenv()));
        logger.log("CONTEXT: " + gson.toJson(context));
        // process event
        logger.log("EVENT: " + gson.toJson(event));
        logger.log("EVENT TYPE: " + event.getClass().toString());

        JSONDocumentManager jsonDocumentManager= null;
        try {
            jsonDocumentManager = getMarkLogicClient(mlUsername,mlPassword).newJSONDocumentManager();

            StringHandle handle=new StringHandle();
            jsonDocumentManager.read("/hackaton/uris.json", handle);

            response=handle.toString();

        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }

        return response;

    }

    public DatabaseClient getMarkLogicClient(String mlUsername, String mlPassword) throws NoSuchAlgorithmException {

        DatabaseClient databaseClient= DatabaseClientFactory.newClient("zxga7rjye.vkunp87wvpv.a.marklogicsvc.com",
                8011, new DatabaseClientFactory.BasicAuthContext(mlUsername,mlPassword).withSSLContext(SSLContext.getDefault()));

        return databaseClient;

    }
}
