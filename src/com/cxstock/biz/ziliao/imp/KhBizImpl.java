package com.cxstock.biz.ziliao.imp;

import java.util.List;

import com.cxstock.biz.ziliao.KhBiz;
import com.cxstock.biz.ziliao.dto.KhDTO;
import com.cxstock.dao.BaseDAO;
import com.cxstock.pojo.Kh;
import com.cxstock.utils.pubutil.Page;

public class KhBizImpl implements KhBiz {
	
	private BaseDAO baseDao;
	public void setBaseDao(BaseDAO baseDao) {
		this.baseDao = baseDao;
	}
	
	/*
	 * 分页查询客户列表
	 */
	@SuppressWarnings("unchecked")
	public void findPageKh(Page page) {
		List list = baseDao.listAll("Kh", page.getStart(), page.getLimit());
		List dtoList = KhDTO.createDtos(list);
		int total = baseDao.countAll("Kh");
		page.setRoot(dtoList);
		page.setTotal(total);
	}
	/*
	 * 保存/修改客户
	 */
	public void saveOrUpdateKh(KhDTO dto) {
		Kh kh = new Kh();
		if(dto.getSbid()!=null){
			kh = (Kh)baseDao.loadById(Kh.class, dto.getSbid());
		}
		
		kh.setDepartment(dto.getDepartment());
		kh.setOwner(dto.getOwner());
		kh.setOwnerbadge(dto.getOwnerbadge());
		kh.setAssettype(dto.getAssettype());
		kh.setMac(dto.getMac());		
		kh.setAddress(dto.getAddress());
		kh.setTel(dto.getTel());
		kh.setAssetid(dto.getAssetid());
		kh.setAssetname(dto.getAssetname());
		baseDao.saveOrUpdate(kh);
	}
	
	/*
	 * 删除客户
	 */
	public void deleteKh(Integer sbid) {
		baseDao.deleteById(Kh.class, sbid);	
	}

}
