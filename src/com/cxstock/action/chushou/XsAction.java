package com.cxstock.action.chushou;


import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

//import org.apache.poi.hssf.usermodel.HSSFSheet;
//import org.apache.poi.hssf.usermodel.HSSFWorkbook;
//import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.struts2.ServletActionContext;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.PropertyFilter;

import com.cxstock.action.BaseAction;
import com.cxstock.biz.chushou.XsBiz;
import com.cxstock.pojo.Ckd;
import com.cxstock.pojo.Ckdsp;
import com.cxstock.pojo.Tkd;

@SuppressWarnings("serial")
public class XsAction extends BaseAction  {
	
	private XsBiz xsBiz;
	
	private String djid;
	private Integer khid;
	private String department;
	
	private String owner;
	private Date riqi;
	private String bz;
	private String type;
	private String tab;
	private String info;
	private String ymd;
	private String djsps; //单据商品集合字符串
	
	private String startdate;
	private String enddate;
	private String search;
	
	/**
	 * 生成单据编号
	 */
	public String getDjCode(){
		try {
			String code = xsBiz.getDjCode(tab,ymd);
			this.outString(code);
		} catch (Exception e) {
			e.printStackTrace();
			this.outError();
		}
		return null;
	}
	
	/**
	 * 保存/修改销售单
	 */
	public String saveOrUpdateCkd() {
		try {
			Ckd pojo = new Ckd();
			pojo.setDjid(djid);
			//pojo.setKhid(khid);
			pojo.setdepartment(department);
			//pojo.setDepartment(department);
			
			pojo.setOwner(owner);
			pojo.setRiqi(riqi);
			pojo.setUserid(this.getUserDTO().getUserid());
			pojo.setUsername(this.getUserDTO().getUsername());
			pojo.setBz(bz);
			pojo.setType(type);
			xsBiz.saveOrUpdateCkd(pojo,djsps);
			this.outString("{success:true}");
		} catch (Exception e) {
			 e.printStackTrace();
			 this.outError();
		}
		return null;
	}
	
	/**
	 * 保存/修改退货单
	 */
	public String saveOrUpdateTkd() {
		try {
			Tkd pojo = new Tkd();
			pojo.setDjid(djid);
			pojo.setKhid(khid);
			pojo.setKhname(department);
			pojo.setOwner(owner);
			pojo.setRiqi(riqi);
			pojo.setUserid(this.getUserDTO().getUserid());
			pojo.setUsername(this.getUserDTO().getUsername());
			pojo.setBz(bz);
			//pojo.setType(type);
			xsBiz.saveOrUpdateTkd(pojo,djsps);
			this.outString("{success:true}");
		} catch (Exception e) {
			 e.printStackTrace();
			 this.outError();
		}
		return null;
	}
	
    
	/**
	 * 删除销售单
	 */
	public String deleteCkd() {
		try {
			xsBiz.deleteCkd(djid);
			this.outString("{success:true}");
		} catch (Exception e) {
			e.printStackTrace();
			this.outError();
		}
		return null;
	}
	
	/**
	 * 删除退货单
	 */
	public String deleteTkd() {
		try {
			xsBiz.deleteTkd(djid);
			this.outString("{success:true}");
		} catch (Exception e) {
			e.printStackTrace();
			this.outError();
		}
		return null;
	}
	
	/**
	 * 按条件查询单据
	 */
	public String findDjByParams(){
		try {
			StringBuffer wheres = new StringBuffer(" where 1=1");
			if(startdate!=null&&enddate!=null){
				wheres.append(" and t.riqi between '");
				wheres.append(startdate);
				wheres.append("' and '");
				wheres.append(enddate);
				wheres.append("'");
			}
			if(search!=null&&!"".equals(search)){
				wheres.append(" and (t.djid like '%");
				wheres.append(search);
				wheres.append("%'");
				wheres.append(" or t.khname like '%");
				wheres.append(search);
				wheres.append("%')");
				wheres.append(" or t.owner like '%");
				wheres.append(search);
				wheres.append("%')");
			}else if(djid!=null){
				wheres.append(" and t.djid='");
				wheres.append(djid);
				wheres.append("'");
			}

			this.outListString(xsBiz.findDjByParams(tab,wheres.toString()));
		} catch (Exception e) {
			e.printStackTrace();
			this.outError();
		}
		return null;
	}
	
	/**
	 * 查询单据商品
	 */
	@SuppressWarnings("unchecked")
	public String findDjspByParams(){
		try {
			StringBuffer wheres = new StringBuffer(" where 1=1");
			if(djid!=null){
				wheres.append(" and t."+info+".djid='");
				wheres.append(djid);
				wheres.append("'");
			}
			List list = xsBiz.findDjByParams(tab,wheres.toString());
			JSONArray jsonArray = new JSONArray();
			if(list.size()>0){
				JsonConfig config = new JsonConfig();
				// 过滤相关的属性即可
				config.setJsonPropertyFilter(new PropertyFilter() {
					public boolean apply(Object source, String name, Object value) {
						if (name.equals(info)) {
							return true;
						}
						return false;
					}
				});
				jsonArray = JSONArray.fromObject(list,config);
			}
			String jsonString = "{total:" + list.size() + ",root:"+ jsonArray.toString() + "}";
			outString(jsonString);
		} catch (Exception e) {
			e.printStackTrace();
			this.outError();
		}
		return null;
	}

	public void setXsBiz(XsBiz xsBiz) {
		this.xsBiz = xsBiz;
	}

	public void setDjid(String djid) {
		this.djid = djid;
	}

	public void setKhid(Integer khid) {
		this.khid = khid;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public void setRiqi(Date riqi) {
		this.riqi = riqi;
	}
	
	public void setOwner(String owner) {
		this.owner = owner;
	}

	public void setBz(String bz) {
		this.bz = bz;
	}
	
	public void setType(String type) {
		this.type = type;
	}

	public void setTab(String tab) {
		this.tab = tab;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public void setYmd(String ymd) {
		this.ymd = ymd;
	}

	public void setDjsps(String djsps) {
		this.djsps = djsps;
	}

	public void setStartdate(String startdate) {
		this.startdate = startdate;
	}

	public void setEnddate(String enddate) {
		this.enddate = enddate;
	}

	public void setSearch(String search) {
		this.search = search;
	}
	

}
