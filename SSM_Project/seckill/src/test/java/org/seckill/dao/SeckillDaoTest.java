package org.seckill.dao;

import org.apache.ibatis.annotations.Param;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.seckill.entity.SeckillTab;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import javax.annotation.Resource;
import javax.swing.plaf.synth.SynthScrollBarUI;
import java.util.Date;
import java.util.List;
import static org.junit.Assert.*;

/**
 * 配置 spring 和 junit 整合， junit启动时加载springIOC容器
 * spring-test  ——方便进行spring测试
 * junit 测试依赖
 *
 */

// @RunWith(SpringJUnit4ClassRunner.class)  junit 依赖，在junit启动时，加载springIOC容器
@RunWith(SpringJUnit4ClassRunner.class)
// 告诉junit spring 的配置文件
@ContextConfiguration({"classpath:spring/spring-dao.xml"})
public class SeckillDaoTest {

    // 注入 DAO 实现类的依赖
    @Resource
    private SeckillDao seckillDao;

    @Test
    public void reduceNumber() {
        Date killTime = new Date();
        int updateCount = seckillDao.reduceNumber(1000L, killTime);
        System.out.println("updateCount = " + updateCount);
    }

    @Test
    public void queryById() {
        /**
         * org.mybatis.spring.MyBatisSystemException: nested exception is org.apache.ibatis.exceptions.PersistenceException: 报错
         * 1、这个是JDBC命名冲突的问题；将 jdbc.properties 中的变量添加前缀 jdbc. ;
         * 2、观察 pom.xml 依赖文件配置数据库链接是否对应 mysql 版本号
         * 3、在spring-dao.xml 中 创建一个sqlSession对象
         * 4、检查数据库代码是否出错
         */
        long id = 1000L;
        SeckillTab seckillTab = seckillDao.queryById(id);
        System.out.println(seckillTab.getSeckillName());
        System.out.println(seckillTab);
    }

    @Test
    public void queryAll() {
        // Parameter 'offset' not found. Available parameters are [0, 1, param1, param2] 报错
        // java 没有保存形参的记录 在接口的方法传参中使用 @Param() 注解传参
        List<SeckillTab> seckillTabs = seckillDao.queryAll(0,100);
        for(SeckillTab seckillTab: seckillTabs){
            System.out.println(seckillTab);
        }
    }
}