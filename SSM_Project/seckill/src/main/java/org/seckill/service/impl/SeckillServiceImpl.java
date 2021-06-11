package org.seckill.service.impl;

import org.seckill.dao.SeckillDao;
import org.seckill.dao.SuccessKilledDao;
import org.seckill.dto.Exposer;
import org.seckill.dto.SeckillExecution;
import org.seckill.entity.SeckillTab;
import org.seckill.entity.SucKilled;
import org.seckill.enums.SeckillStatEnum;
import org.seckill.exception.RepeatKillException;
import org.seckill.exception.SeckillCloseException;
import org.seckill.exception.SeckillException;
import org.seckill.service.SeckillService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.Date;
import java.util.List;

/**
 * Service层实现类，实现Service接口
 * 命名习惯: 接口名 + Impl
 * spring 提供注解类型：
 * --@Component : 代表所有组件，当不知道类属于dao, service,conroller等时使用。统称spring组件实例
 * --@Service : 特指服务层代码
 * --@Controller : 特指控制区代码
 */

@Service
public class SeckillServiceImpl implements SeckillService {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    // 注入Service依赖
    @Autowired  // 自动注入
    private SeckillDao seckillDao;
    @Autowired
    private SuccessKilledDao successKilledDao;
    private final String slat = "the@SLAT&confusion_md5#slat";  // 用于混淆 md5

    @Override
    public List<SeckillTab> getSeckillList() {
        return seckillDao.queryAll(0, 100);
    }

    @Override
    public SeckillTab getSeckillById(long seckillId) {
        return seckillDao.queryById(seckillId);
    }

    @Override
    public Exposer exportSeckillUrl(long seckillId) {
        SeckillTab seckillTab = seckillDao.queryById(seckillId);
        if(seckillTab == null){
            return new Exposer(false, seckillId);
        }
        Date startTime = seckillTab.getStartTime();
        Date endTime = seckillTab.getEndTime();
        Date nowTime = new Date();
        if(nowTime.getTime() < startTime.getTime()||nowTime.getTime()>endTime.getTime()){
            return new Exposer(false, seckillId, nowTime.getTime(), startTime.getTime(), endTime.getTime());
        }
        // md5 本质： 对任意字符串转换为特定长度的编码 —— 不可逆！！
        String md5 = getMD5(seckillId);
        return new Exposer(true, md5, seckillId);
    }

    // 自定义生成 md5 函数
    private String getMD5(long seckillId){
        String base = seckillId + '@' +slat + '#';
        // DigestUtils.md5DigestAsHex() 用于生成 md5 ， 参数为二进制（byte),用 .getBytes()得到字符串二进制
        String md5 = DigestUtils.md5DigestAsHex(base.getBytes());
        return md5;
    }

    @Override
    public SeckillExecution executeSeckill(long seckillId, long userPhone, String md5) throws SeckillException, RepeatKillException, SeckillCloseException {
        try {
            if(md5 == null || !md5.equals(getMD5(seckillId))){
                throw new SeckillException("seckill info rewrite");
            }else{
                // 执行秒杀操作
                // 操作逻辑： 减库存 + 记录购买行为
                Date nowTime = new Date();
                // 减库存
                int updateCount = seckillDao.reduceNumber(seckillId, nowTime);
                if(updateCount <= 0){
                    // 没有更新记录，秒杀已经结束
                    throw new SeckillCloseException("seckill was closed");
                }else{
                    // 记录购买行为
                    int insertCount = successKilledDao.insertSuccessKilled(seckillId, userPhone);
                    if(insertCount <= 0){  // 重复秒杀，无效，抛出重复秒杀异常
                        throw new RepeatKillException("seckill repeated");
                    }else{  // 秒杀成功，打印秒杀记录
                        SucKilled sucKilled = successKilledDao.queryByIdwithSeckill(seckillId, userPhone);
                        return new SeckillExecution(seckillId, SeckillStatEnum.SUCCESS, sucKilled);
                    }
                }
            }
        }catch(SeckillCloseException es){
            throw es;
        }catch(RepeatKillException er){
            throw er;
        }catch (Exception e){
            logger.error(e.getMessage(), e);
            // 将所有编译期异常转化为运行期异常, RuntimeException -> rowback（回滚机制）
            throw new SeckillException("seckill inner error:" + e.getMessage());
        }
    }
}
