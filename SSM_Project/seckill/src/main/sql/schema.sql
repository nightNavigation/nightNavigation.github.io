/*
	created by zjh
	2021.2.1
*/ 

-- 数据库初始化脚本

-- 创建数据库
CREATE DATABASE seckill;
-- 使用数据库
USE seckill;
-- 创建秒杀数据表
CREATE TABLE seckillTab (
	seckill_id BIGINT NOT NULL AUTO_INCREMENT COMMENT '商品库存id',
	seckill_name VARCHAR ( 120 ) NOT NULL COMMENT '商品名称',
	seckill_number INT NOT NULL COMMENT '库存数量',
	start_time TIMESTAMP NOT NULL COMMENT '开启秒杀时间',
	end_time TIMESTAMP NOT NULL COMMENT '秒杀结束时间',
	create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	PRIMARY KEY ( seckill_id ),-- 创建主键
	KEY idx_start_time ( start_time ),-- 创建索引
	KEY idx_end_time ( end_time ),
	KEY idx_create_time ( create_time ) 
) ENGINE = INNODB AUTO_INCREMENT = 1000 DEFAULT CHARSET = utf8 COMMENT = '秒杀库存表';
-- mysql有多种存储引擎，但能支持事务的只有 InnoDB
-- 数据库采用自增作为主键 给出初始的自增ID  ->AUTO_INCREMENT=...
-- CHARSET=utf8 数据表为 utf-8 编码

-- 初始化数据
INSERT INTO seckillTab ( seckill_name, seckill_number, start_time, end_time )
VALUES
	( '1000元 秒杀iPhone6', 100, '2021-2-12 00:00:00', '2021-2-13 00:00:00' ),
	( '5000元 秒杀iPad3', 50, '2021-2-12 00:00:00', '2021-2-13 00:00:00' ),
	( '500元 秒杀huawei6', 500, '2021-2-12 00:00:00', '2021-2-13 00:00:00' ),
	( '2530元 秒杀荣耀5s', 60, '2021-2-12 00:00:00', '2021-2-13 00:00:00' );

INSERT INTO seckillTab ( seckill_name, seckill_number, start_time, end_time )
VALUES
	( '2000元 秒杀HUAWEI|MateBook X Pro i7', 100, '2021-2-17 00:00:00', '2021-2-18 00:00:00' );

SELECT * FROM	seckillTab;
	
-- 秒杀成功明细表
-- 用户登录认证相关信息
CREATE TABLE sucKilled (
	seckill_id BIGINT NOT NULL COMMENT '秒杀商品id',
	user_phone BIGINT NOT NULL COMMENT '用户手机号',
	state TINYINT NOT NULL DEFAULT - 1 COMMENT '状态标识：-1（无效），0（成功），1（已付款）',
	kill_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '秒杀成功时间',
	PRIMARY KEY ( seckill_id, user_phone ),  /* 联合主键 */
	KEY idx_kill_time ( kill_time ) 
) ENGINE = INNODB DEFAULT CHARSET = utf8 COMMENT = '秒杀成功明细表';

SELECT * FROM	sucKilled;

DELETE FROM sucKilled WHERE seckill_id = 1004;

UPDATE seckillTab SET	seckill_number = seckill_number -1 WHERE seckill_id = 1000 AND start_time < '2021-01-12 19:48:57' AND end_time > '2021-01-12 19:48:57' AND seckill_number > 0;

