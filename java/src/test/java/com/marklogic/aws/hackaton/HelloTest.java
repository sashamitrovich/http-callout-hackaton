package com.marklogic.aws.hackaton;

import com.marklogic.client.DatabaseClient;
import com.marklogic.client.document.JSONDocumentManager;
import com.marklogic.client.io.StringHandle;
import org.junit.jupiter.api.Test;

import java.security.NoSuchAlgorithmException;

import static org.junit.jupiter.api.Assertions.assertNotNull;

class HelloTest {

    final String mlUsername="dhs-2-admin";
    final String mlPassword="97&75e$jBJqv";
    final String uri="";

    @Test
    public void readDocumentFromMl() {

    Hello hello=new Hello();
        DatabaseClient databaseClient= null;
        try {
            databaseClient = hello.getMarkLogicClient(mlUsername, mlPassword);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        JSONDocumentManager jsonDocumentManager=databaseClient.newJSONDocumentManager();

        StringHandle handle=new StringHandle();
        jsonDocumentManager.read("/hackaton/uris.json", handle);
        assertNotNull(handle);

    }

}