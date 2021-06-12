package com.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import com.po.UserInfo;

public class UserDao {
	private SessionFactory sf;
	private Session session;

	public UserDao() {
		super();
	}
	
	// 连接数据库，查询功能
	public List<UserInfo> getUser(String hql){
		List<UserInfo> users = new ArrayList<UserInfo>();
		try {
			// 加载 hibernate 配置文件
			sf = new Configuration().configure().buildSessionFactory();
			// 建立会话
			// 导入 Session 包。 注意：导入的Session包为 hibernate的session包
			session = sf.openSession();
			users = session.createQuery(hql).list();
		} catch(HibernateException e) {
			e.printStackTrace();
		}
		
		return users;
	}
		
	// 添加信息功能
	public boolean setUser(UserInfo user) {
		boolean isSuccess = false;
		
		try {
			sf = new Configuration().configure().buildSessionFactory();
			session = sf.openSession();
			Transaction tx = session.beginTransaction();
			session.save(user);
			tx.commit();
			isSuccess = true;
			session.clear();
			session.close();
			
		} catch(HibernateException e){
			e.printStackTrace();
		}
		
		return isSuccess;
	}

}
