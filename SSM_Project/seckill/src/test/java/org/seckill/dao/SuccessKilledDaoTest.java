package org.seckill.dao;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.seckill.entity.SeckillTab;
import org.seckill.entity.SucKilled;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;

import static org.junit.Assert.*;

// @RunWith(SpringJUnit4ClassRunner.class)  junit 依赖，在junit启动时，加载springIOC容器
@RunWith(SpringJUnit4ClassRunner.class)
// 告诉junit spring 的配置文件
@ContextConfiguration({"classpath:spring/spring-dao.xml"})
public class SuccessKilledDaoTest {

    @Resource
    private SuccessKilledDao successKilledDao;

    @Test
    public void insertSuccessKilled() {
        long id = 1000L;
        long phone = 13568957721L;
        int insertCount = successKilledDao.insertSuccessKilled(id, phone);
        System.out.println("insertCount = "+ insertCount);
    }

    @Test
    public void queryByIdwithSeckill() {
        long id = 1000L;
        long phone = 13568957721L;
        SucKilled sucKilled = successKilledDao.queryByIdwithSeckill(id, phone);
        System.out.println(sucKilled);
        System.out.println(sucKilled.getSeckillTab());
    }
}