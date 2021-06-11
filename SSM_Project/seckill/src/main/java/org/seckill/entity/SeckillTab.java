package org.seckill.entity;

import java.util.Date;

/*
 * created by zjh
 * 2021.2.1
 */

public class SeckillTab {
    private long seckillId;
    private String seckillName;
    private int seckillNumber;
    private Date startTime;
    private Date endTime;
    private Date createTime ;
    public SeckillTab() {}
    public SeckillTab(long seckillId, String name, int number, Date startTime, Date endTime, Date createTime) {
        this.seckillId = seckillId;
        this.seckillName = name;
        this.seckillNumber = number;
        this.startTime = startTime;
        this.endTime = endTime;
        this.createTime = createTime;
    }
    public long getSeckillId() {
        return seckillId;
    }
    public void setSeckillId(long seckillId) {
        this.seckillId = seckillId;
    }
    public String getSeckillName() {
        return seckillName;
    }
    public void setSeckillName(String seckillName) {
        this.seckillName = seckillName;
    }
    public int getSeckillNumber() {
        return seckillNumber;
    }
    public void setSeckillNumber(int seckillNumber) {
        this.seckillNumber = seckillNumber;
    }
    public Date getStartTime() {
        return startTime;
    }
    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }
    public Date getEndTime() {
        return endTime;
    }
    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }
    public Date getCreateTime() {
        return createTime;
    }
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    @Override
    public String toString() {
        return "SeckillTab{" +
                "seckillId=" + seckillId +
                ", seckillName='" + seckillName + '\'' +
                ", seckillNumber=" + seckillNumber +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", createTime=" + createTime +
                '}';
    }
}
