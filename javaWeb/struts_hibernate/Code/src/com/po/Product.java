package com.po;

public class Product {
	private int id;
	private String name;
	private int sort;
	private double price;
	private double oneprice;
	private String img;
	private String date;
	private int sale;
	private String face;
	private String body;
	private double length;
	private int quantity;
	private String source;
	public Product() {
		super();
	}
	
	public Product(int id, String name, double price) {
		super();
		this.id = id;
		this.name = name;
		this.price = price;
	}

	public Product(int id, String name, int sort, double price, double oneprice, String img, String date, int sale,
			String face, String body, double length, int quantity, String source) {
		super();
		this.id = id;
		this.name = name;
		this.sort = sort;
		this.price = price;
		this.oneprice = oneprice;
		this.img = img;
		this.date = date;
		this.sale = sale;
		this.face = face;
		this.body = body;
		this.length = length;
		this.quantity = quantity;
		this.source = source;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getSort() {
		return sort;
	}

	public void setSort(int sort) {
		this.sort = sort;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public double getOneprice() {
		return oneprice;
	}

	public void setOneprice(double oneprice) {
		this.oneprice = oneprice;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public int getSale() {
		return sale;
	}

	public void setSale(int sale) {
		this.sale = sale;
	}

	public String getFace() {
		return face;
	}

	public void setFace(String face) {
		this.face = face;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public double getLength() {
		return length;
	}

	public void setLength(double length) {
		this.length = length;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	@Override
	public String toString() {
		return "Product [id=" + id + ", name=" + name + ", sort=" + sort + ", price=" + price + ", oneprice=" + oneprice
				+ ", img=" + img + ", date=" + date + ", sale=" + sale + ", face=" + face + ", body=" + body
				+ ", length=" + length + ", quantity=" + quantity + ", source=" + source + "]";
	}

}
