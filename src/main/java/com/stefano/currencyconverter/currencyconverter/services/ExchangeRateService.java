package com.stefano.currencyconverter.currencyconverter.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stefano.currencyconverter.currencyconverter.entities.Exchange;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Objects;

@Service
public class ExchangeRateService {

    public double getExchangeRate(String sCurr, String tCurr) throws IOException {
        if ( !isCurrencyValid(sCurr) || !isCurrencyValid(tCurr) ) return -1;
        if (Objects.equals(sCurr, tCurr)) return 1;
        String url = "https://api.fixer.io/latest?base=" + sCurr + "&symbols=" + tCurr;
        CloseableHttpClient httpClient = HttpClientBuilder.create().build();
        HttpGet getRequest = new HttpGet(url);
        getRequest.addHeader("accept", "application/json");

        HttpResponse response = httpClient.execute(getRequest);

        if (response.getStatusLine().getStatusCode() != 200) {
            throw new RuntimeException("Failed : HTTP error code : "
                    + response.getStatusLine().getStatusCode());
        }

        BufferedReader br = new BufferedReader(new InputStreamReader((response.getEntity().getContent())));

        StringBuilder jsonString = new StringBuilder();
        String output;
        while ((output = br.readLine()) != null) {
            jsonString.append(output);
        }

        ObjectMapper mapper = new ObjectMapper();
        Exchange exchange = mapper.readValue(jsonString.toString(), Exchange.class);
        httpClient.close();

        System.out.println(exchange);
        if (exchange.getRates().values().size() == 0) return -1;
        return (double) exchange.getRates().values().toArray()[0];
    }

    private boolean isCurrencyValid(String curr) {
        String uppCurr = curr.toUpperCase();
        return Objects.equals(uppCurr, "JPY") || Objects.equals(uppCurr, "USD") || Objects.equals(uppCurr, "EUR");
    }
}
