package com.cxstock.pojo;

/**
 * Tkdsp entity.
 * 
 * @author MyEclipse Persistence Tools
 */

public class Tkdsp implements java.io.Serializable {

	// Fields

	private Integer id;
	private Tkd tkd;
	private String spid;
	private String spname;
	private String spdw;
	private String spxinghao;
	private Integer lbid;
	private String lbname;
	private Integer sl;

	// Constructors

	/** default constructor */
	public Tkdsp() {
	}

	/** full constructor */
	public Tkdsp(Tkd tkd, String spid, String spname, String spdw,
			String spxinghao, Integer lbid, String lbname, Integer sl) {
		this.tkd = tkd;
		this.spid = spid;
		this.spname = spname;
		this.spdw = spdw;
		this.spxinghao = spxinghao;
		this.lbid = lbid;
		this.lbname = lbname;
		this.sl = sl;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Tkd getTkd() {
		return this.tkd;
	}

	public void setTkd(Tkd tkd) {
		this.tkd = tkd;
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

	public Integer getLbid() {
		return lbid;
	}

	public void setLbid(Integer lbid) {
		this.lbid = lbid;
	}

	public String getLbname() {
		return lbname;
	}

	public void setLbname(String lbname) {
		this.lbname = lbname;
	}

	public Integer getSl() {
		return this.sl;
	}

	public void setSl(Integer sl) {
		this.sl = sl;
	}

}