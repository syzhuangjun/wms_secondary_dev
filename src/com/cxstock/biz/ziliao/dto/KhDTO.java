package com.cxstock.biz.ziliao.dto;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

import com.cxstock.pojo.Kh;

public class KhDTO {

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


	public KhDTO() {
		super();
	}

	public KhDTO(Integer sbid,String assetname, String department,String owner, String ownerbadge,
			String assetid, String assettype,String mac,String address,String tel) {
		super();
		this.sbid = sbid;
		this.assetname = assetname;
		this.department = department;
		this.owner = owner;
		this.ownerbadge = ownerbadge;
		this.assetid = assetid;
		this.assettype = assettype;
		this.mac = mac;
		this.address = address;
		this.tel = tel;
	}

	public static KhDTO createDto(Kh pojo) {	
		KhDTO dto = null;
		if (pojo != null) {
			dto = new KhDTO(pojo.getSbid(),pojo.getAssetname(),pojo.getDepartment(),pojo.getOwner(),pojo.getOwnerbadge(),pojo.getAssetid(),
					pojo.getAssettype(),pojo.getMac(),pojo.getAddress(),pojo.getTel());
		}
		return dto;
	}

	@SuppressWarnings("unchecked")
	public static List createDtos(Collection pojos) {
		List<KhDTO> list = new ArrayList<KhDTO>();
		if (pojos != null) {
			Iterator iterator = pojos.iterator();
			while (iterator.hasNext()) {
				list.add(createDto((Kh) iterator.next()));
			}
		}
		return list;
	}
	
	public Integer getSbid() {
		return sbid;
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

	public void setAdd(String address) {
		this.address = address;
	}

	public String getAssettype() {
		return this.assettype;
	}

	public void setAssettype(String assettype) {
		this.assettype = assettype;
	}

}
