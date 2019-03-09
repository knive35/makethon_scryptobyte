package com.example.visitor.dto;

import com.example.visitor.entity.visitorEntity;

public class visitorDTO {
	private String vId;
	private String vName;
	private String refId;
	private String purpose;
	public String getvId() {
		return vId;
	}
	public void setvId(String vId) {
		this.vId = vId;
	}
	public String getvName() {
		return vName;
	}
	public void setvName(String vName) {
		this.vName = vName;
	}
	public String getRefId() {
		return refId;
	}
	public void setRefId(String refId) {
		this.refId = refId;
	}
	public String getPurpose() {
		return purpose;
	}
	public void setPurpose(String purpose) {
		this.purpose = purpose;
	}
	public visitorDTO(String vId, String vName, String refId, String purpose) {
		super();
		this.vId = vId;
		this.vName = vName;
		this.refId = refId;
		this.purpose = purpose;
	}
	public visitorDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public static visitorEntity toEntity(visitorDTO vd) {
		visitorEntity hr= new visitorEntity();
		hr.setvId(vd.getvId());
		hr.setvName(vd.getvName());
		hr.setPurpose(vd.getPurpose());
		hr.setRefId(vd.getRefId());	
		return hr;
	}
	
}
