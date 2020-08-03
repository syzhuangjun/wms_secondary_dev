package com.cxstock.pojo;

import java.util.HashSet;
import java.util.Set;

/**
 * Kh entity.
 * 
 * @author MyEclipse Persistence Tools
 */

@SuppressWarnings("serial")
public class Kh implements java.io.Serializable {

	// Fields
	private Integer sbid;
	private String assetname;
	private String department;
	private String owner;
	private String ownerbadge;
	private String assetid;
	private String assettype;
	private String mac;
	private String address;
	private String tel;
	private Set ckds = new HashSet(0);
	private Set tkds = new HashSet(0);

	// Constructors

	/** default constructor */
	public Kh() {
	}

	/** full constructor */
	public Kh(String assetname, String department,String owner, String ownerbadge,
			String assetid, String assettype,String mac,String address,String tel, Set ckds, Set tkds) {
		this.assetname = assetname;
		this.department = department;
		this.owner = owner;
		this.ownerbadge = ownerbadge;
		this.assetid = assetid;
		this.assettype = assettype;
		this.mac = mac;
		this.address = address;
		this.tel = tel;
		this.ckds = ckds;
		this.tkds = tkds;
	}

	// Property accessors
	public Integer getSbid() {
		return this.sbid;
	}

	public void setSbid(Integer sbid) {
		this.sbid = sbid;
	}
	public String getAssetname() {
		return this.assetname;
	}

	public void setAssetname(String assetname) {
		this.assetname = assetname;
	}

	public String getDepartment() {
		return this.department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}
	public String getOwner() {
		return this.owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public String getOwnerbadge() {
		return this.ownerbadge;
	}

	public void setOwnerbadge(String ownerbadge) {
		this.ownerbadge = ownerbadge;
	}

	public String getAssetid() {
		return this.assetid;
	}

	public void setAssetid(String assetid) {
		this.assetid = assetid;
	}

	public String getTel() {
		return this.tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getMac() {
		return this.mac;
	}

	public void setMac(String mac) {
		this.mac = mac;
	}
	
	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getAssettype() {
		return this.assettype;
	}

	public void setAssettype(String assettype) {
		this.assettype = assettype;
	}
	
	public Set getCkds() {
		return this.ckds;
	}

	public void setCkds(Set ckds) {
		this.ckds = ckds;
	}

	public Set getTkds() {
		return this.tkds;
	}

	public void setTkds(Set tkds) {
		this.tkds = tkds;
	}

}