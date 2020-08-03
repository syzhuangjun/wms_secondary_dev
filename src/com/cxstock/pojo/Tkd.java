package com.cxstock.pojo;

import java.util.Date;

/**
 * Tkd entity.
 * 
 * @author MyEclipse Persistence Tools
 */

public class Tkd implements java.io.Serializable {

	// Fields

	private String djid;
	private Integer khid;
	private String khname;
	private String owner;
	private Date riqi;
	private Integer userid;
	private String username;
	private String bz;

	// Constructors

	/** default constructor */
	public Tkd() {
	}

	/** minimal constructor */
	public Tkd(Date riqi) {
		this.riqi = riqi;
	}

	/** full constructor */
	public Tkd(Integer khid, String khname, String owner, Date riqi, Integer userid, String username,
			String bz) {
		this.khid = khid;
		this.khname = khname;
		this.owner = owner;
		this.riqi = riqi;
		this.userid = userid;
		this.username = username;
		this.bz = bz;
	}
	
	// Property accessors

	public String getDjid() {
		return this.djid;
	}

	public void setDjid(String djid) {
		this.djid = djid;
	}

	public Integer getKhid() {
		return this.khid;
	}

	public void setKhid(Integer khid) {
		this.khid = khid;
	}

	public String getKhname() {
		return this.khname;
	}

	public void setKhname(String khname) {
		this.khname = khname;
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

}