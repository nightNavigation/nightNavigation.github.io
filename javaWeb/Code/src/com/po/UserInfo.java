package com.po;

public class UserInfo {
	private Integer id;
	private String username;
	private String password;
	private String sex;
	private String hobby;
	
	
	public UserInfo() {
		super();
	}


	public UserInfo(Integer id, String username, String password, String sex, String hobby) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.sex = sex;
		this.hobby = hobby;
	}


	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getSex() {
		return sex;
	}


	public void setSex(String sex) {
		this.sex = sex;
	}


	public String getHobby() {
		return hobby;
	}


	public void setHobby(String hobby) {
		this.hobby = hobby;
	}

	
	
}
