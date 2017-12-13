Minimal currency converter
==========================
Built with Spring Boot + Vanilla JS
Use Java 8 or later version to test it.

Usage: one of these methods should do fine
=============================================

1. IDE: it's a maven project so any modern Java IDE should be able to import it correctly. 
From the IDE run the CurrencyconverterApplication which is the entry point with the main method. 
I personally used Intellj for the development.
2. Maven: use `mvn package` to produce a jar in the target folder, then do `java -jar target/currencyconverter-0.0.1-SNAPSHOT.jar` 
to start the backend, check that `localhost:8080/` responds with a simple instruction string.

Once the backend is running open in Chrome the static `index.html` in the frontend `folder` and that should display the app 
in Chrome.