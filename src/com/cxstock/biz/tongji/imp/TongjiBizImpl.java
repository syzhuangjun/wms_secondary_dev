package com.cxstock.biz.tongji.imp;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.cxstock.biz.tongji.TongjiBiz;
import com.cxstock.biz.tongji.dto.DjmxDTO;
import com.cxstock.dao.BaseDAO;
import com.cxstock.pojo.Ckdsp;
import com.cxstock.pojo.Jhd;
import com.cxstock.pojo.Jhdsp;
import com.cxstock.pojo.Thd;
import com.cxstock.pojo.Thdsp;
import com.cxstock.pojo.Tkdsp;;

@SuppressWarnings("unchecked")
public class TongjiBizImpl implements TongjiBiz {
	
	private BaseDAO baseDao;
	public void setBaseDao(BaseDAO baseDao) {
		this.baseDao = baseDao;
	}
	
	/*
	 * 供应商统计
	 */
	public List findGysTj(String wheres) {
		List list = new ArrayList();
		String hql = "from Jhd as t where 1=1"+wheres;
		String hql2 = "from Thd as t where 1=1"+wheres;
		List<Jhd> jhdList = baseDao.findByHql(hql.toString());
		for (Jhd jhd : jhdList) {
			list.add(jhd);
		}
		List<Thd> thdList = baseDao.findByHql(hql2.toString());
		for (Thd thd : thdList) {
			list.add(thd);
		}
		return list;
	}

	/*
	 * 客户统计
	 */
	public List findKhTj(String wheres) {
		String hql = "from Ckd as t where 1=1"+wheres;
		String hql2 = "from Tkd as t where 1=1"+wheres;
		List list = baseDao.findByHql(hql.toString());
		List list2 = baseDao.findByHql(hql2.toString());
		for (int i = 0; i < list2.size(); i++) {
			list.add(list2.get(i));
		}
		return list;
	}

	/*
	 * 商品采购统计
	 */
	public List findSpcgTj(String wheres) {
		List list = new ArrayList();
		String hql = "from Jhdsp as t "+wheres;
		String hql2 = "from Thdsp as t "+wheres.replace("jhd", "thd");
		List<Jhdsp> jhdList = baseDao.findByHql(hql.toString());
		for (Jhdsp jhd : jhdList) {
			list.add(DjmxDTO.createDto(jhd));
		}
		List<Thdsp> thdList = baseDao.findByHql(hql2.toString());
		for (Thdsp thd : thdList) {
			list.add(DjmxDTO.createDto(thd));
		}
		return list;
	}

	/*
	 * 商品销售统计
	 */
	public List findSpxstj(String wheres) {
		List list = new ArrayList();
		String hql = "from Ckdsp as t "+wheres;
		String hql2 = "from Tkdsp as t "+wheres.replace("ckd", "tkd");
		List<Ckdsp> ckdList = baseDao.findByHql(hql.toString());
		for (Ckdsp ckd : ckdList) {
			list.add(DjmxDTO.createDto(ckd));
		}
		List<Tkdsp> tkdList = baseDao.findByHql(hql2.toString());
		for (Tkdsp tkd : tkdList) {
			list.add(DjmxDTO.createDto(tkd));
		}
		return list;
	}

	/*
	 * 按日统计分析t1.riqi='2017-12-25'
	  like '%20171225%'select t.spid,t.spname,sum(t.sl),t.djid from Ckdsp as t where t.ckd.djid like '%20171225%'*/
		
	public String findTjfxRi(String wheres, List<String> dates) 
	{

		String hql = "select DATE_FORMAT(t.ckd.riqi,'%Y-%m-%d'),t.spid,t.spname,sum(t.sl) from Ckdsp as t LEFT JOIN t.ckd as t1 where 1=1"+wheres;
		//String hql2 = "select DATE_FORMAT(t.riqi,'%Y-%m-%d'),t1.spid,t1.spname,sum(t1.sl),t1.zj from Tkd as t,Tkdsp as t1 where 1=1"+wheres;
		
		List list = baseDao.findByHql(hql.toString());
		//List list2 = baseDao.findByHql(hql2.toString());
		
		//组装flash、grid数据
		StringBuffer json = new StringBuffer("{success:'ture', fData:\"<chart caption=' ' rotateYAxisName='1' showValues='1'  decimalPrecision='0' showNames='1'  baseFontSize='12' outCnvBaseFontSiz='20' numberSuffix=''  pieSliceDepth='30' formatNumberScale='0'>");
		StringBuffer gDate = new StringBuffer("\",gData:[");
		//double zj=0f,zjall=0f;
		Integer zl=0,zlall=0;
		String spid="";
		String spname="";
		//for (String date : dates) 
		{
			//double zj=0f;
			//Integer zl=0;
			for (Iterator it = list.iterator(); it.hasNext();) {
				Object[] obj = (Object[]) it.next();
				//if(date.equals(obj[0].toString()))
				{
					zl = Integer.valueOf(obj[3].toString());
					//zj = Double.valueOf(obj[4].toString());
					spid = obj[1].toString();
					spname = obj[2].toString();			
					
					//zjall+=zj;
					zlall+=zl;
					json.append("<set label='");
					json.append(spname);
					json.append("' value='");
					json.append(zl);
					json.append("'/>");
					gDate.append("{riqi:'");
					//gDate.append(date);
//					gDate.append("',zj:'");
//					gDate.append(zj);
					gDate.append("',spid:'");
					gDate.append(spid);
					gDate.append("',spname:'");
					gDate.append(spname);
					gDate.append("'},");
					it.remove();
				}
			}
			/*for (Iterator it = list2.iterator(); it.hasNext();) {
				Object[] obj = (Object[]) it.next();
				if(date.equals(obj[0].toString())){
					zl -= Integer.valueOf(obj[3].toString());
					zj -= Double.valueOf(obj[4].toString());
					it.remove();
				}
			}*/}


		
		json.append("</chart>");
		json.append(gDate.toString());
		json.append("{riqi:'合计',zj:'");
		//json.append(zj);
		//json.append("',zj:'");
		json.append(zl);
		json.append("',zl:'");
		json.append(zl);
		json.append("'}]}");
		return json.toString();
	}

	/*
	 * 按月统计分析DATE_FORMAT(a.riqi,'%Y-%m-%d'),
	 */
	public String findTjfxYue(String wheres, List<String> dates) {

		String hql1 = "select DATE_FORMAT(t.jhd.riqi,'%Y-%m'),t.spid,t.spname,sum(t.sl) from Jhdsp as t LEFT JOIN t.jhd as t1 where 1=1"+wheres;
		//String hql2 = "select DATE_FORMAT(t.riqi,'%Y-%m-%d'),t1.spid,t1.spname,sum(t1.sl),t1.zj from Tkd as t,Tkdsp as t1 where 1=1"+wheres;
		
		List list = baseDao.findByHql(hql1.toString());
		//List list2 = baseDao.findByHql(hql2.toString());
		
		//组装flash、grid数据
		StringBuffer json = new StringBuffer("{success:'ture', fData:\"<chart caption=' ' rotateYAxisName='1' showValues='1'  decimalPrecision='0' showNames='1'  baseFontSize='12' outCnvBaseFontSiz='20' numberSuffix=''  pieSliceDepth='30' formatNumberScale='0'>");
		StringBuffer gDate = new StringBuffer("\",gData:[");
		//double zj=0f,zjall=0f;
		Integer zl=0,zlall=0;
		String spid="";
		String spname="";
		//for (String date : dates) 
		{
			//double zj=0f;
			//Integer zl=0;
			for (Iterator it = list.iterator(); it.hasNext();) {
				Object[] obj = (Object[]) it.next();
				//if(date.equals(obj[0].toString()))
				{
					zl = Integer.valueOf(obj[3].toString());
					//zj = Double.valueOf(obj[4].toString());
					spid = obj[1].toString();
					spname = obj[2].toString();			
					
					//zjall+=zj;
					zlall+=zl;
					json.append("<set label='");
					json.append(spname);
					json.append("' value='");
					json.append(zl);
					json.append("'/>");
					gDate.append("{riqi:'");
					//gDate.append(date);
					//gDate.append("',zj:'");
					//gDate.append(zj);
					gDate.append("',spid:'");
					gDate.append(spid);
					gDate.append("',spname:'");
					gDate.append(spname);
					gDate.append("'},");
					it.remove();
				}
			}
			/*for (Iterator it = list2.iterator(); it.hasNext();) {
				Object[] obj = (Object[]) it.next();
				if(date.equals(obj[0].toString())){
					zl -= Integer.valueOf(obj[3].toString());
					zj -= Double.valueOf(obj[4].toString());
					it.remove();
				}
			}*/}


		
		json.append("</chart>");
		json.append(gDate.toString());
		json.append("{riqi:'合计',zj:'");
		//json.append(zj);
		//json.append("',zj:'");
		//json.append(zl);
		json.append("',zl:'");
		json.append(zl);
		json.append("'}]}");
		return json.toString();
	}
}
