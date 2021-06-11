package com.po;

public class CartInfo {
	// 对应数据库中对象
	private int cartId;
	private int productId;
	private String userName;
	private int count;
	
	// 补充属性
	private Product product;
	private double sumPrice;	
	
	public CartInfo() {
		super();
	}

	public CartInfo(int cartId, int productId, String userName, int count, Product product, double sumPrice) {
		super();
		this.cartId = cartId;
		this.productId = productId;
		this.userName = userName;
		this.count = count;
		this.product = product;
		this.sumPrice = sumPrice;
	}

	public int getCartId() {
		return cartId;
	}

	public void setCartId(int cartId) {
		this.cartId = cartId;
	}

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public double getSumPrice() {
		return sumPrice;
	}

	public void setSumPrice(double sumPrice) {
		this.sumPrice = sumPrice;
	}

	@Override
	public String toString() {
		return "CartInfo [cartId=" + cartId + ", productId=" + productId + ", userName=" + userName + ", count=" + count
				+ ", product=" + product + ", sumPrice=" + sumPrice + "]";
	}

	
	
}
