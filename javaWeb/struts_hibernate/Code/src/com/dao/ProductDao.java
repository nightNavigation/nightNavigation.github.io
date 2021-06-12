package com.dao;

import com.po.Product;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class ProductDao {
	private SessionFactory sf;
	private Session session;
	
	public ProductDao() {
		super();
	}
	
	public List<Product> selectAll(){
		
		List<Product> products = new ArrayList<Product>();
		
		String hql = "FROM Product";
		try {
			sf = new Configuration().configure("hibernate.cfg.xml").buildSessionFactory();
			session = sf.openSession();
			products = session.createQuery(hql).list();
		} catch(HibernateException e) {
			e.printStackTrace();
		}

		return products;
	}
	
	public List<Product> selectTopLimit(int selNum, int limit, Integer sort, String keyword){
		List<Product> products = new ArrayList<Product>();
		String sql = "SELECT TOP " + selNum + " * FROM product WHERE id NOT IN (SELECT TOP " + limit + " id FROM product)";
		if (sort != null) {
			sql += " AND sort = " + sort;
		}
		if (keyword != null) {
			sql += " AND name like '%" + keyword + "%'";
		}
		try {
			sf = new Configuration().configure("hibernate.cfg.xml").buildSessionFactory();
			session = sf.openSession();
			products = session.createSQLQuery(sql).addEntity(Product.class).list();
			
		} catch(HibernateException e) {
			e.printStackTrace();
		}
		return products;
	}
	
	public Product selectById(Integer id){
		List<Product> list = new ArrayList<Product>();
		Product product = new Product();
		String hql = "FROM Product WHERE id = '" + id + "'";
		try {
			sf = new Configuration().configure().buildSessionFactory();
			session = sf.openSession();
			list = session.createQuery(hql).list();
		} catch(HibernateException e) {
			e.printStackTrace();
		}
		product = list.get(0);
		return product;
	}
	

}
