package com.example.springrest.controller;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.springrest.apiservice.apiservice;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class MyControler {
	
	@GetMapping("/type")
	public String getMovieType(){
		String res = apiservice.getMovieType();
		return res;
	}
	@GetMapping("/trending/{page}")
	public String getTrendingMovie(@PathVariable String page){
		String res = apiservice.getTrendingMovie(page);
		return res;
	}
	@GetMapping("/searched/{query}")
	public String getQueryResult(@PathVariable String query){
		String res = apiservice.getQueryResult(query);
		return res;
	}
	@GetMapping("/movie_detail/{id}")
	public String getMovieDetail(@PathVariable String id){
		String res = apiservice.getMovieDetail(id);
		return res;
	}
}
