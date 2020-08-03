package com.cxstock.biz.ziliao.dto;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

import com.cxstock.pojo.Spxx;
public class SpxxDTO {


	private String spid;
	private String spname;
	private String xinghao;
	private Integer lbid;
	private String lbname;
	private String dw;
	private Integer kcsl;
	private Integer minnum;
	private String csname;
	private String state;
	private String bz;

	public SpxxDTO() {
		super();
	}

	public SpxxDTO(String spid,String spname, String xinghao, Integer lbid, String lbname,
			String dw, Integer kcsl,Integer minnum, String csname,String state, String bz) {
		this.spid = spid;
		this.spname = spname;
		this.xinghao = xinghao;
		this.lbid = lbid;
		this.lbname = lbname;
		this.dw = dw;
		this.kcsl = kcsl;
		this.minnum = minnum;
		this.csname = csname;
		this.state = state;
		this.bz = bz;
	}

	public static SpxxDTO createDto(Spxx pojo) {
		SpxxDTO dto = null;
		if (pojo != null) {
			dto = new SpxxDTO(pojo.getSpid(),pojo.getSpname(),
					pojo.getXinghao(),pojo.getLbid(),pojo.getLbname(),pojo.getDw(),pojo.getKcsl(),pojo.getMinnum(),pojo.getCsname(),pojo.getState(),pojo.getBz());
		}
		return dto;
	}

	@SuppressWarnings("unchecked")
	public static List createDtos(Collection pojos) {
		List<SpxxDTO> list = new ArrayList<SpxxDTO>();
		if (pojos != null) {
			Iterator iterator = pojos.iterator();
			while (iterator.hasNext()) {
				list.add(createDto((Spxx) iterator.next()));
			}
		}
		return list;
	}

	// Property accessors

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

	public String getXinghao() {
		return this.xinghao;
	}

	public void setXinghao(String xinghao) {
		this.xinghao = xinghao;
	}

	public Integer getLbid() {
		return this.lbid;
	}

	public void setLbid(Integer lbid) {
		this.lbid = lbid;
	}

	public String getLbname() {
		return this.lbname;
	}

	public void setLbname(String lbname) {
		this.lbname = lbname;
	}

	public String getDw() {
		return this.dw;
	}

	public void setDw(String dw) {
		this.dw = dw;
	}

	public Integer getKcsl() {
		return this.kcsl;
	}

	public void setKcsl(Integer kcsl) {
		this.kcsl = kcsl;
	}

	public Integer getMinnum() {
		return this.minnum;
	}

	public void setMinnum(Integer minnum) {
		this.minnum = minnum;
	}

	public String getCsname() {
		return this.csname;
	}

	public void setCsname(String csname) {
		this.csname = csname;
	}

	public String getState() {
		return this.state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getBz() {
		return this.bz;
	}

	public void setBz(String bz) {
		this.bz = bz;
	}
}
