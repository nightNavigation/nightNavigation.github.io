package org.seckill.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.seckill.dto.Exposer;
import org.seckill.dto.SeckillExecution;
import org.seckill.entity.SeckillTab;
import org.seckill.exception.RepeatKillException;
import org.seckill.exception.SeckillCloseException;
import org.seckill.exception.SeckillException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

// @RunWith(SpringJUnit4ClassRunner.class)  junit 依赖，在junit启动时，加载springIOC容器
@RunWith(SpringJUnit4ClassRunner.class)
// 告诉junit spring 的配置文件
@ContextConfiguration({
        "classpath:spring/spring-dao.xml",
        "classpath:spring/spring-service.xml"})
public class SeckillServiceTest {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private SeckillService seckillService;

    @Test
    public void getSeckillList() {
        List<SeckillTab> list = seckillService.getSeckillList();
        logger.info("list={}", list);
        // Closing non transactional SqlSession ——> 只读操作，不是在事务控制下
    }

    @Test
    public void getSeckillById() {
        long id = 1000L;
        SeckillTab seckillTab = seckillService.getSeckillById(id);
        logger.info("seckill={}", seckillTab);
    }

    @Test
    public void exportSeckillUrl() {
//        long id = 1000L;
        long id = 1004L;
        Exposer exposer = seckillService.exportSeckillUrl(id);
        logger.info("exposer={}", exposer);
        // 秒杀未开启或已结束（报错）： exposer=Exposer{exposed=false, md5='null', seckillId=1000, now=1612421304186, start=1610380800000, end=1610467200000}
        // 秒杀开启： exposer=Exposer{exposed=true, md5='da80b6ac68b1c8e104bf3964c6d6b7e3', seckillId=1004, now=0, start=0, end=0}
    }

    @Test
    public void executeSeckill() {
//        long id = 1000L;
        long id = 1004L;
        long phone = 13568957721L;
        String md5 = "da80b6ac68b1c8e104bf3964c6d6b7e3";
        try {
            SeckillExecution execution = seckillService.executeSeckill(id, phone, md5);
            logger.info("result={}", execution);
            // result=SeckillExecution{seckillId=1004, state=1, stateInfo='秒杀成功', sucKilled=SucKilled [seckillId=1004, userPhone=13568957721, state=0, killTime=Thu Feb 04 15:29:57 CST 2021]}
        } catch (RepeatKillException er) {
            logger.error(er.getMessage());
        } catch (SeckillCloseException es) {
            logger.error(es.getMessage());
        }
    }

    // 测试代码完整逻辑，注意代码的可重复执行性
    @Test  // 整合 exportSeckillUrl() 与 executeSeckill() 测试
    public void testSeckillLogic() {
        long id = 1004L;
        Exposer exposer = seckillService.exportSeckillUrl(id);
        long phone = 13568957769L;
        if(exposer.isExposed()){
            String md5 = exposer.getMd5();
            try {
                SeckillExecution execution = seckillService.executeSeckill(id, phone, md5);
                logger.info("result={}", execution);
                // result=SeckillExecution{seckillId=1004, state=1, stateInfo='秒杀成功', sucKilled=SucKilled [seckillId=1004, userPhone=13568957721, state=0, killTime=Thu Feb 04 15:29:57 CST 2021]}
            } catch (RepeatKillException er) {
                logger.error(er.getMessage());
            } catch (SeckillCloseException es) {
                logger.error(es.getMessage());
            }
        }else{
            // 秒杀未开启
            logger.warn("exposer={}", exposer);
        }
    }
}