package com.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.Statement;
import java.util.Vector;

public class DataProcess {
	private String url="jdbc:sqlserver://localhost:1433;databaseName=shopping;"; 
	private String user="sa"; 
	private String password="sasasa";
	private Connection conn=null;
	private Statement stm=null;
	public Vector getData(String sql){
		Vector rows=new Vector();
		try{
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver"); 
			conn=DriverManager.getConnection(url, user, password);
			stm=conn.createStatement();
			ResultSet rst=stm.executeQuery(sql); 
			ResultSetMetaData rstd=rst.getMetaData();
			Vector rowData=null;
			while(rst.next()){
				rowData=new Vector();
				for (int i = 1; i <rstd.getColumnCount()+1 ; i++) {
					rowData.add(rst.getString(i));
				}
//				rowData.add(rst.getString(1));
//				rowData.add(rst.getString(2));
				rows.add(rowData);
			}
			stm.close();
			conn.close();
		}catch(Exception e){
			System.err.print(e);
		}
		return rows;
	}
	public int update(String sql){
		int num=0;
		try{
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
			conn=DriverManager.getConnection(url, user, password);
			stm=conn.createStatement();
			num=stm.executeUpdate(sql);
			stm.close();
			conn.close();
		}catch(Exception e){
			System.err.print(e);
		}
		return num;
	}
}
