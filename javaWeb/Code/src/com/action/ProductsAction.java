package com.action;

import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

import com.dao.ProductDao;
import com.db.DataProcess;
import com.opensymphony.xwork2.ActionContext;
import com.po.Product;
import com.tools.SqlToClass;

public class ProductsAction {
	private Integer offset;
	private Integer sort;
	private Integer eleNumOfPage;
	private Integer id;
	private String textfield;
	
	public ProductsAction() {
		super();
	}
	
	public Integer getOffset() {
		return offset;
	}

	public void setOffset(Integer offset) {
		this.offset = offset;
	}
	public Integer getSort() {
		
		return this.sort;
	}
	public void setSort(Integer sort) {
		this.sort = sort;
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getEleNumOfPage() {
		return eleNumOfPage;
	}

	public void setEleNumOfPage(Integer eleNumOfPage) {
		this.eleNumOfPage = eleNumOfPage;
	}

	public String getTextfield() {
		return textfield;
	}

	public void setTextfield(String textfield) {
		this.textfield = textfield;
	}

	public String indexProductShow() {
//		DataProcess data = new DataProcess();
//		String sql = "SELECT Top 9 * FROM product;";
//		Vector vdata = data.getData(sql);
//		Vector<Product> products = SqlToClass.toProduct(vdata);
		ProductDao productDao = new ProductDao();
		List<Product> products = productDao.selectTopLimit(9, 0, null, "");
//		System.out.println(products);
		ActionContext.getContext().put("products", products);
		
		return "showSuccess";
	}
	
	public String productShow() {
		if (this.getOffset() == null || this.getOffset() <= 0) {
			this.setOffset(0);
		}
		if(this.getSort() == null || this.getSort() <= 0) {
			this.setSort(0);
		}
		if(this.getEleNumOfPage() == null || this.getEleNumOfPage() <= 0) {
			this.setEleNumOfPage(0);
		}
		ProductDao productDao = new ProductDao();
		List<Product> products = new ArrayList<Product>();
		Integer addSort = null;	
		String keyword = this.textfield==null?"":this.textfield;	
		while(products.size() == 0 && this.getOffset() >= 0) {
			if(this.getSort() != 0) {
				addSort = this.getSort();
			}
			products = productDao.selectTopLimit(6, this.offset, addSort, keyword);
			if(products.size()!=0)
				eleNumOfPage = products.size();
			else {
				this.offset = this.offset - eleNumOfPage;
			}
		}
		ActionContext.getContext().put("products", products);
		ActionContext.getContext().put("sort", this.sort);
		ActionContext.getContext().put("keyword", keyword);
		ActionContext.getContext().put("eleNumOfPage", this.eleNumOfPage);
			
		return "showSuccess";
	}
	
	public String itemShow() {
		ProductDao productDao = new ProductDao();
		
		if(this.id == null) {
			return "showError";
		}
		
		Product product = productDao.selectById(id);
		if(product == null) {
			return "showError";
		}
		
		ActionContext.getContext().put("product", product);
		
		return "showSuccess";
	}
	
}
