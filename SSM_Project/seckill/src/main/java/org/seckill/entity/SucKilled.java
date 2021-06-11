package org.seckill.entity;

import java.util.Date;

public class SucKilled {
    private long seckillId;
    private long userPhone;
    private int state;
    private Date killTime;
    private SeckillTab seckillTab;  // 可能一个用户能秒杀多个产品

    public SucKilled() {}
    public SucKilled(long seckillId, long userPhone, int state, Date killTime) {
        this.seckillId = seckillId;
        this.userPhone = userPhone;
        this.state = state;
        this.killTime = killTime;
    }
    public long getSeckillId() {
        return seckillId;
    }
    public void setSeckillId(long seckillId) {
        this.seckillId = seckillId;
    }
    public long getUserPhone() {
        return userPhone;
    }
    public void setUserPhone(long userPhone) {
        this.userPhone = userPhone;
    }
    public int getState() {
        return state;
    }
    public void setState(int state) {
        this.state = state;
    }
    public Date getKillTime() {
        return killTime;
    }
    public void setKillTime(Date killTime) {
        this.killTime = killTime;
    }
    public SeckillTab getSeckillTab() {
        return seckillTab;
    }
    public void setSeckillTab(SeckillTab seckillTab) {
        this.seckillTab = seckillTab;
    }
    @Override
    public String toString() {
        return "SucKilled [seckillId=" + seckillId + ", userPhone=" + userPhone + ", state=" + state + ", killTime="
                + killTime + "]";
    }

}
