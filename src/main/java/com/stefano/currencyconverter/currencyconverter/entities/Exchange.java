package com.stefano.currencyconverter.currencyconverter.entities;

import java.util.Map;

public class Exchange {

    private String base;
    private String date;
    private Map<String, Double> rates;

    public String getBase() {
        return base;
    }

    public String getDate() {
        return date;
    }

    public Map<String, Double> getRates() {
        return rates;
    }

    public void setBase(String base) {
        this.base = base;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setRates(Map<String, Double> rates) {
        this.rates = rates;
    }

    @Override
    public String toString() {
        return super.toString() + " base: " + base + " rate: " + rates;
    }
}
