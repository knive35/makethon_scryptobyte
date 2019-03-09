package com.example.visitor.controller;

import java.util.List;
import java.util.logging.Logger;
import java.io.IOException;
import java.util.*;
import javax.activation.*;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.visitor.dto.visitorDTO;
import com.example.visitor.repository.visitorRepository;
import com.example.visitor.service.VisitorService;
import com.google.zxing.WriterException;

@RestController
public class visitorController {
	
	@Autowired 
	VisitorService vss;
	@Autowired
	visitorRepository vr;
	@RequestMapping(value="/api/", method=RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	public String saveData(@RequestBody visitorDTO visitor) {
		try {
			vss.sendNotification(visitor);
		}
		catch(MailException e) {
			System.out.println(e.getMessage());
			//error message
		}
	      return vss.saveData(visitor);
	}
	@RequestMapping(value="/api/approved/{txt}")
	public void generateQR(@PathVariable String txt) {
		System.out.println(txt);
		try {
            vss.generateQR(txt);
        } catch (WriterException e) {
            System.out.println("Could not generate QR Code, WriterException :: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("Could not generate QR Code, IOException :: " + e.getMessage());
        }
    }
		
	}
	
	


