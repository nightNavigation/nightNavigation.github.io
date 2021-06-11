package org.seckill.exception;

/**
 * 重复秒杀异常（本质上：运行期异常）  —— 属于秒杀相关业务异常
 * 用户通过重复执行秒杀程序提高秒杀成功率时，当秒杀成功时，产生重复秒杀异常
 * 系统能够识别重复秒杀异常并阻止重复秒杀行为
 */

public class RepeatKillException extends SeckillException {
    public RepeatKillException(String message) {
        super(message);
    }

    public RepeatKillException(String message, Throwable cause) {
        super(message, cause);
    }
}
