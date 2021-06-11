package org.seckill.exception;

/**
 * 秒杀关闭异常（运行期异常）  —— 属于秒杀相关业务异常
 * 当秒杀接口关闭时，仍有用户接入秒杀时抛出的异常
 */

public class SeckillCloseException extends SeckillException {
    public SeckillCloseException(String message) {
        super(message);
    }

    public SeckillCloseException(String message, Throwable cause) {
        super(message, cause);
    }
}
