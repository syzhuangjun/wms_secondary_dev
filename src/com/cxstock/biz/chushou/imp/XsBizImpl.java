package com.cxstock.biz.chushou.imp;

//import java.io.File;
//import java.io.FileInputStream;
//import java.io.IOException;
//import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

//import javax.servlet.http.HttpServletResponse;

//import org.apache.poi.hssf.usermodel.HSSFSheet;
//import org.apache.poi.hssf.usermodel.HSSFWorkbook;
//import org.apache.poi.poifs.filesystem.POIFSFileSystem;
//import org.apache.struts2.ServletActionContext;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.cxstock.biz.chushou.XsBiz;
import com.cxstock.dao.BaseDAO;
import com.cxstock.pojo.Ckd;
import com.cxstock.pojo.Ckdsp;
import com.cxstock.pojo.Spxx;
import com.cxstock.pojo.Tkd;
import com.cxstock.pojo.Tkdsp;
import com.cxstock.utils.system.Tools;

@SuppressWarnings("unchecked")
public class XsBizImpl implements XsBiz {
	
	private BaseDAO baseDao;
	public void setBaseDao(BaseDAO baseDao) {
		this.baseDao = baseDao;
	}
	
	/*
	 * 生成单据编号
	 */
	public String getDjCode(String tab, String ymd) {
		String code = ymd.replaceAll("-", "");
		String startrq = ymd+"-1-1";
		String stoprq = ymd+"-12-31";
		String hql = "select max(t.djid) from "+tab+" as t where t.riqi between '"+startrq+" 00:00:00' and '"+stoprq+" 23:59:59'";
		List list = baseDao.findByHql(hql);
		Object obj = list.get(0);
		if(obj!=null)
			return code+Tools.formatCode(obj.toString());
		return code+"0001";
	}
	
	/*
	 *  保存/修改销售单
	 */
	public void saveOrUpdateCkd(Ckd pojo, String jhdsps) {
		baseDao.saveOrUpdate(pojo);
		JSONArray jsonArray = new JSONArray();
		jsonArray = JSONArray.fromObject(jhdsps);
		List spList = new ArrayList();
		List spxxList = new ArrayList();
		for (int i = 0; i < jsonArray.size(); i++) {
			JSONObject jo = (JSONObject) jsonArray.get(i);
			Ckdsp ckdsp = new Ckdsp();
			ckdsp.setCkd(pojo);
			ckdsp.setSpid(jo.getString("spid"));
			ckdsp.setSpname(jo.getString("spname"));
			ckdsp.setSpdw(jo.getString("dw"));
			ckdsp.setSpxinghao(jo.getString("xinghao"));
			ckdsp.setLbid(jo.getInt("lbid"));
			ckdsp.setLbname(jo.getString("lbname"));
			ckdsp.setSl(jo.getInt("sl"));
			spList.add(ckdsp);
			Spxx spxx = (Spxx)baseDao.loadById(Spxx.class, ckdsp.getSpid());
			spxx.setKcsl(spxx.getKcsl()-ckdsp.getSl());
			spxx.setState("2");
			spxxList.add(spxx);
		}
		baseDao.saveOrUpdateAll(spList);
		baseDao.saveOrUpdateAll(spxxList);
	}

	/*
	 * 保存/修改退货单
	 */
	public void saveOrUpdateTkd(Tkd pojo, String thdsps) {
		baseDao.saveOrUpdate(pojo);
		JSONArray jsonArray = new JSONArray();
		jsonArray = JSONArray.fromObject(thdsps);
		List spList = new ArrayList();
		List spxxList = new ArrayList();
		for (int i = 0; i < jsonArray.size(); i++) {
			JSONObject jo = (JSONObject) jsonArray.get(i);
			Tkdsp tkdsp = new Tkdsp();
			tkdsp.setTkd(pojo);
			tkdsp.setSpid(jo.getString("spid"));
			tkdsp.setSpname(jo.getString("spname"));
			tkdsp.setSpdw(jo.getString("dw"));
			tkdsp.setSpxinghao(jo.getString("xinghao"));
			tkdsp.setLbid(jo.getInt("lbid"));
			tkdsp.setLbname(jo.getString("lbname"));
			tkdsp.setSl(jo.getInt("sl"));
			spList.add(tkdsp);
			Spxx spxx = (Spxx)baseDao.loadById(Spxx.class, tkdsp.getSpid());
			spxx.setKcsl(spxx.getKcsl()+tkdsp.getSl());
			spxx.setState("2");
			spxxList.add(spxx);
		}
		baseDao.saveOrUpdateAll(spList);
		baseDao.saveOrUpdateAll(spxxList);
	}

	/*
	 * 按条件查询单据
	 */
	public List findDjByParams(String tab, String wheres) {
		StringBuffer hql = new StringBuffer("from ");
		hql.append(tab);
		hql.append(" as t");
		hql.append(wheres);
		return baseDao.findByHql(hql.toString());
	}

	public void deleteCkd(String djid) {
		baseDao.update("delete Ckdsp where djid='"+djid+"'");
		baseDao.deleteById(Ckd.class, djid);
	}

	public void deleteTkd(String djid) {
		baseDao.update("delete Tkdsp where djid='"+djid+"'");
		baseDao.deleteById(Tkd.class, djid);
	}
	/*public void exportExcel(Ckd pojo,String djsps) {
		
	   try {
		   		

		    File file = new File("D:/mb.xls");//C:/Program Files (x86)/Apache Software Foundation/Tomcat 6.0/webapps/MyStock/data/mb.xls
	        FileInputStream fileInput = new FileInputStream(file);  
	        POIFSFileSystem ts = new POIFSFileSystem(fileInput); 
	        //对应Excel文件中的sheet，0代表第一个
	        HSSFWorkbook workbook = new HSSFWorkbook(ts); 
	        HSSFSheet sh = workbook.getSheet("sheet3");
	        //String name = ServletActionContext.getRequest().getParameter("khname");
			JSONArray jsonArray = new JSONArray();
			jsonArray = JSONArray.fromObject(djsps);
			
//			for (int i = 0; i < jsonArray.size(); i++) {
//				JSONObject jo = (JSONObject) jsonArray.get(i);
//				Ckdsp ckdsp = new Ckdsp();
//				ckdsp.setCkd(pojo);
////				ckdsp.setSpid(jo.getString("spid"));
////				ckdsp.setSpname(jo.getString("spname"));
////				ckdsp.setSpdw(jo.getString("dw"));
//				System.out.println(jo.getString("spname"));
//			
//			};
	        //sh.getRow(4).getCell(7).setCellValue(ServletActionContext.getRequest().getParameter("khname"));//(short)i
	        //Ckd pojo = new Ckd();
	        sh.getRow(4).getCell(7).setCellValue(pojo.getKhname());
			
			//System.out.println(pojo.getKhname());
	        //System.out.println(jsonArray.get(1));
//	        for(int i=2;i<19;i++){  
//	            //对第五行的数据修改  ServletActionContext.getRequest().getParameter("khname")
//	            sh.getRow(4).getCell(i).setCellValue('A');  
//	        }
	          
	          
		      String fileName = "XXX表";
		      HttpServletResponse res = ServletActionContext.getResponse();// = null;vnd.ms-excel//charset=gb2312
		      res.reset();			        
		      OutputStream outputStream = res.getOutputStream();
		      
		      res.setHeader("Content-Disposition", "attachment;filename=" + new String((fileName + ".xls").getBytes(), "iso-8859-1"));
		      workbook.write(outputStream);
		      fileInput.close();  
	    } catch (IOException e) {  
	    e.printStackTrace();
	    
	    } 

}*/

}
