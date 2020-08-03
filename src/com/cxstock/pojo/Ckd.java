package com.cxstock.pojo;

import java.util.Date;

/**
 * Ckd entity.
 * 
 * @author MyEclipse Persistence Tools
 */

public class Ckd implements java.io.Serializable {

	// Fields

	/**
	 * 
	 */
	private String djid;
	private Integer sbid;
	private String department;
	private Date riqi;
	private String owner;
	private Integer userid;
	private String username;
	private String bz;
	private String type;

	// Constructors

	/** default constructor */
	public Ckd() {
	}

	/** minimal constructor */
	public Ckd(Date riqi) {
		this.riqi = riqi;
	}

	/** full constructor */
	public Ckd(Integer sbid, String department,String owner,Date riqi, Integer userid, String username,
			String bz,String type) {
		this.sbid = sbid;
		this.department = department;
		this.riqi = riqi;
		this.owner = owner;
		this.userid = userid;
		this.username = username;
		this.bz = bz;
		this.type = type;
	}

	// Property accessors

	public String getDjid() {
		return this.djid;
	}

	public void setDjid(String djid) {
		this.djid = djid;
	}

	public Integer getSbid() {
		return this.sbid;
	}

	public void setSbid(Integer sbid) {
		this.sbid = sbid;
	}

	public String getdepartment() {
		return this.department;
	}

	public void setdepartment(String department) {
		this.department = department;
	}
	
	public String getOwner() {
		return this.owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public Date getRiqi() {
		return this.riqi;
	}

	public void setRiqi(Date riqi) {
		this.riqi = riqi;
	}

	public Integer getUserid() {
		return this.userid;
	}

	public void setUserid(Integer userid) {
		this.userid = userid;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getBz() {
		return this.bz;
	}

	public void setBz(String bz) {
		this.bz = bz;
	}
	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

}