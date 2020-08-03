package com.cxstock.action.ziliao;


import com.cxstock.action.BaseAction;
import com.cxstock.biz.ziliao.KhBiz;
import com.cxstock.biz.ziliao.dto.KhDTO;
import com.cxstock.utils.pubutil.Page;

@SuppressWarnings("serial")
public class KhAction extends BaseAction  {
	
	private KhBiz khBiz;
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
		
	/** 
	 * 分页查询客户列表 
	 */
	public String findPageKh() {
		try {
			Page page = new Page();
			page.setStart(this.getStart());
			page.setLimit(this.getLimit());
			khBiz.findPageKh(page);
			this.outPageString(page);
		} catch (Exception e) {
			e.printStackTrace();
			this.outError();
		}
		return null;
	}	

	/**
	 * 保存/修改客户
	 */
	public String saveOrUpdateKh() {
		try {
			KhDTO dto = new KhDTO(sbid,assetname,department,owner,ownerbadge,assetid,assettype,mac,address,tel);
			khBiz.saveOrUpdateKh(dto);
			if(assetid==null){
				this.outString("{success:true,message:'保存成功!'}");
			}else{
				this.outString("{success:true,message:'修改成功!'}");
			}
		} catch (Exception e) {
			 e.printStackTrace();
			 this.outError();
		}
		return null;
	}
    
	/**
	 * 删除客户
	 */
	public String deleteKh() {
		try {
			khBiz.deleteKh(sbid);
			this.outString("{success:true}");
		} catch (Exception e) {
			e.printStackTrace();
			this.outError();
		}
		return null;
	}
	
	public void setKhBiz(KhBiz khBiz) {
		this.khBiz = khBiz;
	}

	public void setAssetname(String assetname) {
		this.assetname = assetname;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public void setOwnerbadge(String ownerbadge) {
		this.ownerbadge = ownerbadge;
	}

	public void setAssetid(String assetid) {
		this.assetid = assetid;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public void setMac(String mac) {
		this.mac = mac;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public void setAssettype(String assettype) {
		this.assettype = assettype;
	}
}
