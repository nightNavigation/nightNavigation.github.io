package com.tools;

import java.util.Vector;

import com.po.CartInfo;
import com.po.Product;
import com.po.UserInfo;

public class SqlToClass {
	public static Vector<Product> toProduct(Vector vdata) {
		Vector<Product> products = new Vector<Product>();
		for(int i=0;i<vdata.size();i++){
			Vector pdata = (Vector) vdata.get(i);
			Product product = new Product();
			product.setId(Integer.parseInt((String)pdata.get(0)));
			product.setName((String)pdata.get(1));
			product.setSort(Integer.parseInt((String)pdata.get(2)));
			product.setPrice(Double.parseDouble((String)pdata.get(3)));
			product.setOneprice(Double.parseDouble((String)pdata.get(4)));
			product.setImg((String)pdata.get(5));
			product.setDate((String)pdata.get(6));
			product.setSale(Integer.parseInt((String)pdata.get(7)));
			product.setFace((String)pdata.get(8));
			product.setBody((String)pdata.get(9));
			product.setLength(Double.parseDouble((String)pdata.get(10)));
			product.setQuantity(Integer.parseInt((String)pdata.get(11)));
			product.setSource((String)pdata.get(12));
			products.add(product);
		}
		return products;
	}
	
	public static Vector<CartInfo> toCartInfo(Vector vdata) {
		Vector<CartInfo> cartInfos = new Vector<CartInfo>();
		for(int i=0;i<vdata.size();i++){
			Vector cdata = (Vector) vdata.get(i);
			CartInfo cartInfo = new CartInfo();
			cartInfo.setCartId(Integer.parseInt((String) cdata.get(0)));
			cartInfo.setProductId(Integer.parseInt((String) cdata.get(1)));
			cartInfo.setUserName((String) cdata.get(2));
			cartInfo.setCount(Integer.parseInt((String) cdata.get(4)));
			cartInfo.setSumPrice(Double.parseDouble((String) cdata.get(5)));
			cartInfos.add(cartInfo);
		}
		return cartInfos;
	}
	
	public static Vector<UserInfo> toUserInfo(Vector vdata){
		Vector<UserInfo> users = new Vector<UserInfo>();
		for (int i=0;i<vdata.size();i++) {
			Vector v = (Vector) vdata.get(i);
			UserInfo user = new UserInfo();
			user.setId(Integer.parseInt((String) v.get(0)));
			user.setUsername((String) v.get(1));
			user.setPassword((String) v.get(2));
			user.setSex(v.get(3) == null? (String) v.get(3): null);
			user.setHobby(v.get(4)== null? (String) v.get(4): null);
			users.add(user);
		}
		return users;
	}
}
