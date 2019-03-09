package com.example.visitor.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.visitor.dto.visitorDTO;
import com.example.visitor.entity.visitorEntity;
import com.example.visitor.repository.visitorRepository;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;


@Service
public class VisitorService {
	private JavaMailSender javaMailSender;
	@Autowired
	visitorRepository vss;
	int width = 350; 
	int height = 350; 
	String filePath= "./MYqrCODE.png";
	
		public static void generateQR(String text) throws WriterException, IOException {
	        QRCodeWriter qrCodeWriter = new QRCodeWriter();
	        BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, 350, 350);

	        Path path = FileSystems.getDefault().getPath("./myQRcode.png");
	        MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);
	    }
	
	public String saveData(visitorDTO visitor) {
		visitorEntity entity = visitorDTO.toEntity(visitor);
		vss.saveAndFlush(entity);
		//call functions to send mail
		return "success";
	}
	@Autowired
	public VisitorService(JavaMailSender javaMailSender) {
		this.javaMailSender=javaMailSender;
		 
	}
	public void sendNotification(visitorDTO visitor) throws MailException {
		SimpleMailMessage mail=new SimpleMailMessage();
		mail.setTo(visitor.getRefId());
		mail.setFrom("kameshburde36@gmail.com");
		mail.setSubject("hello");
	    String qrstr = "%7B%22id%22%3A%22"+visitor.getvId()+"%22%2C%22refEmail%22%3A%22"+visitor.getRefId()+"%22%2C%22name%22%3A%22"+visitor.getvName()+"%22%2C%22purpose%22%3A%22"+visitor.getPurpose()+"%22%7D";
	
	    mail.setText("10.64.110.235:8000/api/approved/"+qrstr);
		javaMailSender.send(mail);
		
	}
}


