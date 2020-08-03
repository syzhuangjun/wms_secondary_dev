package com.cxstock.pojo;

/**
 * Bydsp entity.
 * 
 * @author MyEclipse Persistence Tools
 */

public class Bydsp implements java.io.Serializable {

	// Fields

	private Integer id;
	private String djid;
	private String spid;
	private String spname;
	private String spdw;
	private String spxinghao;
	private Integer sl;

	// Constructors

	/** default constructor */
	public Bydsp() {
	}

	/** minimal constructor */
	public Bydsp(String djid, String spid) {
		this.djid = djid;
		this.spid = spid;
	}

	/** full constructor */
	public Bydsp(String djid, String spid, String spname, String spdw,
			String spxinghao, Integer sl) {
		this.djid = djid;
		this.spid = spid;
		this.spname = spname;
		this.spdw = spdw;
		this.spxinghao = spxinghao;
		this.sl = sl;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDjid() {
		return this.djid;
	}

	public void setDjid(String djid) {
		this.djid = djid;
	}

	public String getSpid() {
		return this.spid;
	}

	public void setSpid(String spid) {
		this.spid = spid;
	}

	public String getSpname() {
		return this.spname;
	}

	public void setSpname(String spname) {
		this.spname = spname;
	}

	public String getSpdw() {
		return this.spdw;
	}

	public void setSpdw(String spdw) {
		this.spdw = spdw;
	}

	public String getSpxinghao() {
		return this.spxinghao;
	}

	public void setSpxinghao(String spxinghao) {
		this.spxinghao = spxinghao;
	}

	public Integer getSl() {
		return this.sl;
	}

	public void setSl(Integer sl) {
		this.sl = sl;
	}

}