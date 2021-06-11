package org.seckill.service;

import org.apache.ibatis.annotations.Param;
import org.seckill.dto.Exposer;
import org.seckill.dto.SeckillExecution;
import org.seckill.entity.SeckillTab;
import org.seckill.exception.RepeatKillException;
import org.seckill.exception.SeckillCloseException;
import org.seckill.exception.SeckillException;

import java.util.List;

/**
 * 业务接口：站在 “使用者” 的角度设计接口
 * 三个方面：方法定义粒度、参数、返回类型（return 类型友好/可以抛出异常）
 */

public interface SeckillService {

    /**
     * 查询所有秒杀记录
     * @return
     */
    List<SeckillTab> getSeckillList();

    /**
     * 查询单个秒杀记录
     * @param seckillId
     * @return
     */
    SeckillTab getSeckillById(@Param("seckillId") long seckillId);

    /**
     * 目的：秒杀开启时输出秒杀地址，否则输出系统时间和秒杀时间
     * DTO ：封装数据传输，
     * @param seckillId
     */
    Exposer exportSeckillUrl(@Param("seckill") long seckillId);

    /**
     * 执行秒杀操作
     * 内部 md5 比对方式如果不匹配，则用户ID被篡改，拒绝执行秒杀
     * 当抛出异常时，应该告诉接口使用方，可能会输出什么样的异常
     * SeckillException : 告诉用户秒杀错误
     * RepeatKillException : 告诉用户已经秒杀成功
     * SeckillCloseException : 告诉用户秒杀已经关闭
     * @param seckillId
     * @param userPhone
     * @param md5
     */
    SeckillExecution executeSeckill(long seckillId, long userPhone, String md5)
            throws SeckillException, RepeatKillException, SeckillCloseException;
}
