package com.action;

import java.util.List;
import java.util.Vector;

import com.dao.UserDao;
import com.db.DataProcess;
import com.opensymphony.xwork2.ActionContext;
import com.po.UserInfo;
import com.tools.SqlToClass;

public class UserAction {
	private String userName;
	private String pwd;
	private String repass;
	private String sex;
	private String[] interest;
	private String mess;
	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public String getRepass() {
		return repass;
	}
	public void setRepass(String repass) {
		this.repass = repass;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String[] getInterest() {
		return interest;
	}
	public void setInterest(String[] interest) {
		this.interest = interest;
	}
	public String getMess() {
		return mess;
	}
	public void setMess(String mess) {
		this.mess = mess;
	}
	
	
	public String login() {
		if(this.getUserName() == null || this.getUserName().equals("")) {
			this.mess = "用户名不能为空！";
			ActionContext.getContext().put("mess", this.mess);
			return "loginError";
		}
		if(this.getPwd() == null || this.getPwd().equals("")) {
			this.mess = "密码不能为空！";
			ActionContext.getContext().put("mess", this.mess);
			return "loginError";
		}
//		DataProcess data = new DataProcess();
//		String sql = "SELECT * FROM userinfo WHERE username = '" + this.getUserName() + "';";
//		Vector vdata = data.getData(sql);
//		Vector<UserInfo> users = SqlToClass.toUserInfo(vdata);
		String hql = "FROM UserInfo WHERE username = '" + this.getUserName() +"'";
		UserDao userDao = new UserDao();
		List<UserInfo> users = userDao.getUser(hql);
		if(users.size() == 0) {
			this.mess = "该用户不存在。";
			ActionContext.getContext().put("mess", this.mess);
			return "loginError";
		}
		if(!users.get(0).getPassword().equals(this.getPwd())) {
			this.mess = "密码不正确。" + users.get(0).getPassword();
			ActionContext.getContext().put("mess", this.mess);
			return "loginError";
		}
		UserInfo user = users.get(0);
		ActionContext.getContext().getSession().put("userinfo", user);
		
		return "loginSuccess";
	}
	
	public String loginOut() {
		ActionContext.getContext().getSession().clear();
		return "loginoutSuccess";
	}
	
	public String reg() {
		UserDao userDao = new UserDao();
		boolean isSuccess = false;
		
		// 验证数据
		if(this.getUserName() == null || this.getUserName().equals("")) {
			this.mess = "用户名不能为空";
			ActionContext.getContext().put("mess", this.mess);
			return "regError";
		}
		if(this.getPwd() == null || this.getPwd().equals("")) {
			this.mess = "密码不能为空";
			ActionContext.getContext().put("mess", this.mess);
			return "regError";
		}
		if(!this.getPwd().equals(this.getRepass())) {
			this.mess = "确认密码输入不一致";
			ActionContext.getContext().put("mess", this.mess);
			return "regError";			
		}
//		DataProcess data = new DataProcess();
//		String sql = "SELECT * FROM UserInfo WHERE username = '" + this.getUserName() + "'";
//		Vector vdata = data.getData(sql);
		String hql = "FROM UserInfo WHERE username = '" + this.getUserName() +"'";
		List<UserInfo> vdata = userDao.getUser(hql);
		if(vdata.size() != 0) {
			this.mess = "用户已存在，请重新申请账号";
			ActionContext.getContext().put("mess", this.mess);
			return "regError";		
		}
		UserInfo user = new UserInfo();
		user.setId(null);
		user.setUsername(this.getUserName());
		user.setPassword(this.getPwd());
		user.setSex(this.getSex());
		String hobby = "";
		if(this.getInterest() == null) {
			user.setHobby(hobby);
		}else {
			hobby += this.interest[0];
			for (int i = 1;i<this.interest.length;i++) {
				hobby += ", " + this.interest[i];
			}
			user.setHobby(hobby);
		}
//		sql = "INSERT INTO userinfo(username, password, sex, interest) VALUES ('" + user.getUsername() + "', '" + user.getPassword() + "', '" + user.getSex() + "', '" + user.getHobby() + "');";
//		data.update(sql);
		isSuccess = userDao.setUser(user);
		if(isSuccess) {
			ActionContext.getContext().getSession().put("userinfo", user);
			return "regSuccess";
		}
		
		return "regError";

	}
}
