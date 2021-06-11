package org.seckill.dao;

import java.util.List;
import java.util.Date;

import org.apache.ibatis.annotations.Param;
import org.seckill.entity.SeckillTab;


// alt + enter 加光标置于要建立测试类的类名上 ——> 创建测试类
public interface SeckillDao {
    /**
     * 减库存，获取商品id及秒杀时间
     * @param seckillId
     * @param killTime
     * @return
     */
    // java 没有保存形参的记录 在接口的方法传参中使用 @Param() 注解传参
    int reduceNumber(@Param("seckillId") long seckillId, @Param("killTime") Date killTime);

    /**
     * 通过库存ID，查询库存量
     * @param seckillId
     * @return
     */
    SeckillTab queryById(@Param("seckillId") long seckillId);

    /**
     * 根据偏移量查询秒杀商品列表
     * @param offset
     * @param limit
     * @return
     * offset：偏移量； limit：偏移量后取多少数据
     */
    List<SeckillTab> queryAll(@Param("offset") int offset, @Param("limit") int limit);
}
