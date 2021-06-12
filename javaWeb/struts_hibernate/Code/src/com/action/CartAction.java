package com.action;

import java.util.ArrayList;
import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.dao.CartDao;
import com.opensymphony.xwork2.ActionContext;
import com.po.CartInfo;
import com.po.UserInfo;

public class CartAction {
	private String mess;
	private int productId;
	private double price;
	private int count;
	private String subData;
	
	public String getMess() {
		return mess;
	}

	public void setMess(String mess) {
		this.mess = mess;
	}

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public String getSubData() {
		return subData;
	}

	public void setSubData(String subData) {
		this.subData = subData;
	}

	public String cartShow() {
		CartDao cartDao = new CartDao();
		UserInfo user = (UserInfo) ActionContext.getContext().getSession().get("userinfo");
		if(user.getUsername() == null) {
			this.mess = "ÇëÏÈµÇÂ¼";
			ActionContext.getContext().put("mess", this.mess);
			return "showError";
		}
		List<CartInfo> carts = cartDao.getData(user);
		double sum = 0;
		for (int i=0;i<carts.size();i++) {
			sum += carts.get(i).getSumPrice();
		}
		ActionContext.getContext().put("carts", carts);
		ActionContext.getContext().put("sum", sum);
		return "showSuccess";
	}
	
	public String cartSet() {
		CartDao cartDao = new CartDao();
		UserInfo user = (UserInfo) ActionContext.getContext().getSession().get("userinfo");
		if(user.getUsername() == null) {
			this.mess = "ÇëÏÈµÇÂ¼";
			ActionContext.getContext().put("mess", this.mess);
			return "missError";
		}
		boolean isSuccess = false;
		CartInfo cart = new CartInfo();
		cart.setUserName(user.getUsername());
		cart.setProductId(this.productId);
		cart.setCount(this.count);
		System.out.println(cart);
		isSuccess = cartDao.insertData(cart, user);
		if(isSuccess)
			return this.cartShow();
		else
			return "setError";
	}
	
	public String cartUpdate() {
		CartDao cartDao = new CartDao();
		boolean isSuccess = false;
		JSONObject data = JSONObject.parseObject(this.subData);
		List delList = (List) data.get("delList");
		List updateList = (List) data.get("updateList");
		JSONObject udata = (JSONObject) updateList.get(0);
		isSuccess = (cartDao.delData(delList)==true&&cartDao.updateData(updateList)==true)?true:false;
		if(isSuccess)
			return this.cartShow();
//		System.out.println("delList = " + delList);
//		System.out.println("updateList = "+ updateList);
		return "updateError";
	}
}
