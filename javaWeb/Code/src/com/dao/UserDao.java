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
	
	// �������ݿ⣬��ѯ����
	public List<UserInfo> getUser(String hql){
		List<UserInfo> users = new ArrayList<UserInfo>();
		try {
			// ���� hibernate �����ļ�
			sf = new Configuration().configure().buildSessionFactory();
			// �����Ự
			// ���� Session ���� ע�⣺�����Session��Ϊ hibernate��session��
			session = sf.openSession();
			users = session.createQuery(hql).list();
		} catch(HibernateException e) {
			e.printStackTrace();
		}
		
		return users;
	}
		
	// �����Ϣ����
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
