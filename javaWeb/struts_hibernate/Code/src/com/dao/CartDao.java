package com.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import com.alibaba.fastjson.JSONObject;
import com.po.CartInfo;
import com.po.Product;
import com.po.UserInfo;

public class CartDao {
	private SessionFactory sf;
	private Session session;
	
	public CartDao() {
		super();
	}
	
	public List<CartInfo> getData(UserInfo user){
		
		List<CartInfo> list = new ArrayList<CartInfo>();
		String hql = "SELECT new CartInfo(c.cartId, c.productId, c.userName, c.count, p, p.price*c.count) FROM CartInfo c , Product p WHERE c.productId = p.id AND c.userName = '" + user.getUsername() + "'";
		
		try {
			sf = new Configuration().configure().buildSessionFactory();
			session = sf.openSession();
			list = session.createQuery(hql).list();
		} catch(HibernateException e) {
			System.err.println(e);
		}
		
		return list;
	}
	
	public boolean insertData (CartInfo cart, UserInfo user) {
		boolean isSuccess = false;
		List<CartInfo> carts = this.getData(user);
		if(carts.size() != 0) {
			int pid = carts.get(0).getProductId();
			if (pid == cart.getProductId())
				cart.setCartId(carts.get(0).getCartId());
		}
		try {
			sf = new Configuration().configure().buildSessionFactory();
			session = sf.openSession();
			Transaction tx = session.beginTransaction();
			session.saveOrUpdate(cart);
			tx.commit();
			isSuccess = true;
			session.clear();
			session.close();
		} catch(HibernateException e) {
			System.err.println(e);
		}
		return isSuccess;
	}
	
	public boolean delData (List delList) {
		boolean isSuccess = false;
		String hql = "from CartInfo where cartid in (";
		if(delList.size() == 0)
			return true;
		if(delList.size() == 1)
			hql += delList.get(0) + ")";
		if(delList.size() > 1) {
			hql += delList.get(0);
			for(int i=1;i<delList.size();i++) {
				hql += ", " + delList.get(i);
			}
			hql += ")";
		}
		try {
			sf = new Configuration().configure().buildSessionFactory();
			session = sf.openSession();
			Transaction tx = session.beginTransaction();
			List<CartInfo> carts = session.createQuery(hql).list();
			for(int i=0;i<carts.size();i++) {
				session.delete(carts.get(i));
			}
			tx.commit();
			isSuccess = true;
			session.clear();
			session.close();
		} catch(HibernateException e) {
			System.err.println(e);
		}
		return isSuccess;
	}
	
	public boolean updateData(List updateList) {
		boolean isSuccess = false;
		try {
			sf = new Configuration().configure().buildSessionFactory();
			session = sf.openSession();
			Transaction tx = session.beginTransaction();
			for(int i=0;i<updateList.size();i++) {
				JSONObject data = (JSONObject) updateList.get(i);
				String sql = "update cart set count = " + data.get("count") + " where cartid =" + data.get("cid");
				System.out.println(sql);
				Query query = session.createSQLQuery(sql);
				query.executeUpdate();
			}
			tx.commit();
			isSuccess = true;
			session.clear();
			session.close();
		} catch(HibernateException e) {
			System.err.println(e);
		}
		return isSuccess;
	}
	
}
