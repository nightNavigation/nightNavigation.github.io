package org.seckill.dto;

import org.seckill.entity.SucKilled;
import org.seckill.enums.SeckillStatEnum;

/**
 * 封装秒杀后执行的结果
 */
public class SeckillExecution {
    private long seckillId;
    private int state;            // 秒杀状态
    private String stateInfo;     // 秒杀状态描述
    private SucKilled sucKilled;  // 秒杀成功对象

    public SeckillExecution() {}
    public SeckillExecution(long seckillId, SeckillStatEnum seckillStatEnum, SucKilled sucKilled) {
        this.seckillId = seckillId;
        this.state = seckillStatEnum.getState();
        this.stateInfo = seckillStatEnum.getStateInfo();
        this.sucKilled = sucKilled;
    }
    public SeckillExecution(long seckillId, SeckillStatEnum seckillStatEnum) {
        this.seckillId = seckillId;
        this.state = seckillStatEnum.getState();
        this.stateInfo = seckillStatEnum.getStateInfo();
    }

    public long getSeckillId() {
        return seckillId;
    }

    public void setSeckillId(long seckillId) {
        this.seckillId = seckillId;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public String getStateInfo() {
        return stateInfo;
    }

    public void setStateInfo(String stateInfo) {
        this.stateInfo = stateInfo;
    }

    public SucKilled getSucKilled() {
        return sucKilled;
    }

    public void setSucKilled(SucKilled sucKilled) {
        this.sucKilled = sucKilled;
    }

    @Override
    public String toString() {
        return "SeckillExecution{" +
                "seckillId=" + seckillId +
                ", state=" + state +
                ", stateInfo='" + stateInfo + '\'' +
                ", sucKilled=" + sucKilled +
                '}';
    }
}
