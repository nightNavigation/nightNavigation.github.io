package org.seckill.dao;

import org.apache.ibatis.annotations.Param;
import org.seckill.entity.SucKilled;

public interface SuccessKilledDao {

    /**
     * 插入购买明细，可过滤重复秒杀信息（一个对象可能对同一商品进行多次秒杀）
     * @param seckillId
     * @param userPhone
     * @return
     */
    int insertSuccessKilled(@Param("seckillId") long seckillId, @Param("userPhone") long userPhone);

    /**
     * 根据id查询sucKilled并携带秒杀的产品对象实体。
     * @param seckillId
     * @param userPhone
     * @return
     */
    SucKilled queryByIdwithSeckill(@Param("seckillId") long seckillId, @Param("userPhone") long userPhone);
}
