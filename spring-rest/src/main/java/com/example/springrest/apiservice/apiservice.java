package com.example.springrest.apiservice;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import com.example.springrest.entity.MyEntity;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.net.URI;
import java.net.http.HttpClient;
import java.io.IOException;

public class apiservice {
	private static String API_KEY = "7615edde7038e8114eb9d81e70f23e0e";
	
	    public static String getMovieType() {

	            // API URL to call
	            String apiUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key="+ API_KEY + "&language=en-US";
	            
			return fetchApi(apiUrl);
	    }	
	    
	    public static String getTrendingMovie( String page) {
	       
	            // API URL to call
	            String apiUrl = "https://api.themoviedb.org/3/trending/all/day?api_key=" +API_KEY+ "&page=" + page;
	            return fetchApi(apiUrl);
	   
	    }
	    
	    public static String getQueryResult( String query) {
		       
            // API URL to call
            String apiUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY+ "&language=en-US&query=" + query + "&page=1&include_adult=false";
            return fetchApi(apiUrl);
   
	    }
	    
	    public static String getMovieDetail( String id) {
		       
            // API URL to call
            String apiUrl = "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + API_KEY + "&language=en-US";
            return fetchApi(apiUrl);
	    }
	    
	    private static String fetchApi( String apiUrl) {
	        try {
	           
	            // Create the HttpClient
	            HttpClient httpClient = HttpClient.newHttpClient();
	            
	            // Prepare the HTTP request
	            HttpRequest httpRequest = HttpRequest.newBuilder()
	                    .uri(URI.create(apiUrl))
	                    .GET()
	                    .build();
	            
	            // Send the request and get the response
	            HttpResponse<String> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
	            
	            // Get the JSON response as a string
	            String jsonResponse = response.body();
	            
	            // Now you can work with the userResponse object, which contains the parsed JSON data
	            System.out.println("Response from the API (parsed JSON):");
	            System.out.println(jsonResponse);
	            return jsonResponse;
	        } catch (Exception e) {
	            // Handle exceptions
	            e.printStackTrace();
	        }
			return null;
	    }	
}
