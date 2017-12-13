package com.stefano.currencyconverter.currencyconverter.controllers;

import com.stefano.currencyconverter.currencyconverter.services.ExchangeRateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@CrossOrigin
@RestController
public class MainController {

    @Autowired
    private ExchangeRateService exchangeRateService;

    @RequestMapping("/")
    public String hello() {
        return "/convert?sCurr='source-currency-string'&tCurr='source-currency-string'&amount=<float-value>" +
                "<br><br>Note that you use only USD, EUR and JPY as currencies";
    }

    @RequestMapping("/convert")
    public double calculateConversion(
            @RequestParam(value = "sCurr") String sCurr,
            @RequestParam(value = "tCurr") String tCurr,
            @RequestParam(value = "amount") double amount
    ) {
        if (amount < 0) return -1;
        double conversion = -1;
        try {
            conversion = exchangeRateService.getExchangeRate(sCurr, tCurr) * amount;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return conversion;
    }
}
