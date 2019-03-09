package com.example.visitor.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="vdata")
public class visitorEntity {
	@Id 
	private String vId;
	private String vName;
	private String refId;
	private String purpose;
	public visitorEntity(String vId, String vName, String refId, String purpose) {
		super();
		this.vId = vId;
		this.vName = vName;
		this.refId = refId;
		this.purpose = purpose;
	}
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
	public visitorEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
