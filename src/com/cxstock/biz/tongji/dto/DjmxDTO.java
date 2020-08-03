package com.cxstock.biz.tongji.dto;

import java.util.Date;

import com.cxstock.pojo.Ckdsp;
import com.cxstock.pojo.Jhdsp;
import com.cxstock.pojo.Thdsp;
import com.cxstock.pojo.Tkdsp;


public class DjmxDTO {

	private String type;
	private String djid;
	private Date riqi;
	private Integer gyskhid;
	private String gyskhname;
	private String owner;
	private Integer lbid;
	private String lbname;
	private String spid;
	private String spname;
	private String spdw;
	private String spxinghao;
	private Integer sl;
	
	public DjmxDTO() {
		super();
	}
	
	public DjmxDTO(String djid, Date riqi, Integer gyskhid, String gyskhname,String owner,
			Integer lbid, String lbname, String spid, String spname,
			String spdw, String spxinghao,Integer sl) {
		super();
		this.djid = djid;
		this.riqi = riqi;
		this.gyskhid = gyskhid;
		this.gyskhname = gyskhname;
		this.owner = owner;
		this.lbid = lbid;
		this.lbname = lbname;
		this.spid = spid;
		this.spname = spname;
		this.spdw = spdw;
		this.spxinghao = spxinghao;
		this.sl = sl;
	}
	public DjmxDTO(String djid, Date riqi, Integer gyskhid, String gyskhname,
			Integer lbid, String lbname, String spid, String spname,
			String spdw, String spxinghao, Integer sl) {
		super();
		this.djid = djid;
		this.riqi = riqi;
		this.gyskhid = gyskhid;
		this.gyskhname = gyskhname;
		this.lbid = lbid;
		this.lbname = lbname;
		this.spid = spid;
		this.spname = spname;
		this.spdw = spdw;
		this.spxinghao = spxinghao;
		this.sl = sl;
	}
	public static DjmxDTO createDto(Jhdsp pojo) {
		DjmxDTO dto = null;
		if (pojo != null) {
			dto = new DjmxDTO(pojo.getJhd().getDjid(),pojo.getJhd().getRiqi(),
					pojo.getJhd().getGysid(),pojo.getJhd().getGysname(),pojo.getLbid(),
					pojo.getLbname(),pojo.getSpid(),pojo.getSpname(),pojo.getSpdw(),
					pojo.getSpxinghao(),pojo.getSl());
		}
		return dto;
	}
	public static DjmxDTO createDto(Thdsp pojo) {
		DjmxDTO dto = null;
		if (pojo != null) {
			dto = new DjmxDTO(pojo.getThd().getDjid(),pojo.getThd().getRiqi(),
					pojo.getThd().getGysid(),pojo.getThd().getGysname(),pojo.getLbid(),
					pojo.getLbname(),pojo.getSpid(),pojo.getSpname(),pojo.getSpdw(),
					pojo.getSpxinghao(),pojo.getSl());
		}
		return dto;
	}
	public static DjmxDTO createDto(Ckdsp pojo) {
		DjmxDTO dto = null;
		if (pojo != null) {
			dto = new DjmxDTO(pojo.getCkd().getDjid(),pojo.getCkd().getRiqi(),
					pojo.getCkd().getSbid(),pojo.getCkd().getdepartment(),pojo.getCkd().getOwner(),
					pojo.getLbid(),pojo.getLbname(),pojo.getSpid(),pojo.getSpname(),pojo.getSpdw(),
					pojo.getSpxinghao(),pojo.getSl());
		}
		return dto;
	}
	public static DjmxDTO createDto(Tkdsp pojo) {
		DjmxDTO dto = null;
		if (pojo != null) {
			dto = new DjmxDTO(pojo.getTkd().getDjid(),pojo.getTkd().getRiqi(),
					pojo.getTkd().getKhid(),pojo.getTkd().getKhname(),pojo.getLbid(),
					pojo.getLbname(),pojo.getSpid(),pojo.getSpname(),pojo.getSpdw(),
					pojo.getSpxinghao(),pojo.getSl());
		}
		return dto;
	}

	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getDjid() {
		return djid;
	}
	public void setDjid(String djid) {
		this.djid = djid;
	}
	public Date getRiqi() {
		return riqi;
	}
	public void setRiqi(Date riqi) {
		this.riqi = riqi;
	}
	public Integer getGyskhid() {
		return gyskhid;
	}
	public void setGyskhid(Integer gyskhid) {
		this.gyskhid = gyskhid;
	}
	public String getGyskhname() {
		return gyskhname;
	}
	public void setGyskhname(String gyskhname) {
		this.gyskhname = gyskhname;
	}
	public String getOwner() {
		return owner;
	}
	public void setOwner(String owner) {
		this.owner = owner;
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
	public String getSpid() {
		return spid;
	}
	public void setSpid(String spid) {
		this.spid = spid;
	}
	public String getSpname() {
		return spname;
	}
	public void setSpname(String spname) {
		this.spname = spname;
	}
	public String getSpdw() {
		return spdw;
	}
	public void setSpdw(String spdw) {
		this.spdw = spdw;
	}
	public String getSpxinghao() {
		return spxinghao;
	}
	public void setSpxinghao(String spxinghao) {
		this.spxinghao = spxinghao;
	}

	public Integer getSl() {
		return sl;
	}
	public void setSl(Integer sl) {
		this.sl = sl;
	}
}