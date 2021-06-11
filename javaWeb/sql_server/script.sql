USE [master]
GO
/****** Object:  Database [shopping]    Script Date: 06/11/2021 17:06:54 ******/
CREATE DATABASE [shopping] ON  PRIMARY 
( NAME = N'shopping_Data', FILENAME = N'F:\JavaCode\eclipse\java-workspace\webShopping\db2000\shopping_Data.MDF' , SIZE = 1600KB , MAXSIZE = UNLIMITED, FILEGROWTH = 10%)
 LOG ON 
( NAME = N'shopping_Log', FILENAME = N'F:\JavaCode\eclipse\java-workspace\webShopping\db2000\shopping_Log.LDF' , SIZE = 1024KB , MAXSIZE = UNLIMITED, FILEGROWTH = 10%)
GO
ALTER DATABASE [shopping] SET COMPATIBILITY_LEVEL = 80
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [shopping].[dbo].[sp_fulltext_database] @action = 'disable'
end
GO
ALTER DATABASE [shopping] SET ANSI_NULL_DEFAULT OFF
GO
ALTER DATABASE [shopping] SET ANSI_NULLS OFF
GO
ALTER DATABASE [shopping] SET ANSI_PADDING OFF
GO
ALTER DATABASE [shopping] SET ANSI_WARNINGS OFF
GO
ALTER DATABASE [shopping] SET ARITHABORT OFF
GO
ALTER DATABASE [shopping] SET AUTO_CLOSE OFF
GO
ALTER DATABASE [shopping] SET AUTO_CREATE_STATISTICS ON
GO
ALTER DATABASE [shopping] SET AUTO_SHRINK ON
GO
ALTER DATABASE [shopping] SET AUTO_UPDATE_STATISTICS ON
GO
ALTER DATABASE [shopping] SET CURSOR_CLOSE_ON_COMMIT OFF
GO
ALTER DATABASE [shopping] SET CURSOR_DEFAULT  GLOBAL
GO
ALTER DATABASE [shopping] SET CONCAT_NULL_YIELDS_NULL OFF
GO
ALTER DATABASE [shopping] SET NUMERIC_ROUNDABORT OFF
GO
ALTER DATABASE [shopping] SET QUOTED_IDENTIFIER OFF
GO
ALTER DATABASE [shopping] SET RECURSIVE_TRIGGERS OFF
GO
ALTER DATABASE [shopping] SET  DISABLE_BROKER
GO
ALTER DATABASE [shopping] SET AUTO_UPDATE_STATISTICS_ASYNC OFF
GO
ALTER DATABASE [shopping] SET DATE_CORRELATION_OPTIMIZATION OFF
GO
ALTER DATABASE [shopping] SET TRUSTWORTHY OFF
GO
ALTER DATABASE [shopping] SET ALLOW_SNAPSHOT_ISOLATION OFF
GO
ALTER DATABASE [shopping] SET PARAMETERIZATION SIMPLE
GO
ALTER DATABASE [shopping] SET READ_COMMITTED_SNAPSHOT OFF
GO
ALTER DATABASE [shopping] SET HONOR_BROKER_PRIORITY OFF
GO
ALTER DATABASE [shopping] SET  READ_WRITE
GO
ALTER DATABASE [shopping] SET RECOVERY SIMPLE
GO
ALTER DATABASE [shopping] SET  MULTI_USER
GO
ALTER DATABASE [shopping] SET PAGE_VERIFY TORN_PAGE_DETECTION
GO
ALTER DATABASE [shopping] SET DB_CHAINING OFF
GO
EXEC sys.sp_db_vardecimal_storage_format N'shopping', N'ON'
GO
USE [shopping]
GO
/****** Object:  Table [dbo].[userinfo]    Script Date: 06/11/2021 17:06:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[userinfo](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[username] [varchar](50) NOT NULL,
	[password] [varchar](50) NOT NULL,
	[sex] [varchar](10) NULL,
	[interest] [varchar](50) NULL,
 CONSTRAINT [PK_userinfo] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[userinfo] ON
INSERT [dbo].[userinfo] ([id], [username], [password], [sex], [interest]) VALUES (1, N'admin     ', N'admin     ', NULL, NULL)
INSERT [dbo].[userinfo] ([id], [username], [password], [sex], [interest]) VALUES (2, N's', N's', NULL, NULL)
INSERT [dbo].[userinfo] ([id], [username], [password], [sex], [interest]) VALUES (4, N't', N't', NULL, NULL)
INSERT [dbo].[userinfo] ([id], [username], [password], [sex], [interest]) VALUES (8, N'a', N'a', N'man', N'钓鱼,爬山')
INSERT [dbo].[userinfo] ([id], [username], [password], [sex], [interest]) VALUES (9, N'k', N'k', N'man', N'爬山,钓鱼')
INSERT [dbo].[userinfo] ([id], [username], [password], [sex], [interest]) VALUES (10, N'l', N'l', N'man', N'爬山,钓鱼')
INSERT [dbo].[userinfo] ([id], [username], [password], [sex], [interest]) VALUES (11, N'm', N'm', N'man', N'爬山,钓鱼')
INSERT [dbo].[userinfo] ([id], [username], [password], [sex], [interest]) VALUES (12, N'w', N'w', N'man', N'钓鱼,爬山')
INSERT [dbo].[userinfo] ([id], [username], [password], [sex], [interest]) VALUES (13, N'f', N'f', N'man', N'钓鱼')
INSERT [dbo].[userinfo] ([id], [username], [password], [sex], [interest]) VALUES (14, N'tt', N'tt', N'man', N'爬山,钓鱼')
INSERT [dbo].[userinfo] ([id], [username], [password], [sex], [interest]) VALUES (15, N'ww', N'ww', N'man', N'爬山,钓鱼')
INSERT [dbo].[userinfo] ([id], [username], [password], [sex], [interest]) VALUES (16, N'as', N'as', N'man', N'看书')
INSERT [dbo].[userinfo] ([id], [username], [password], [sex], [interest]) VALUES (19, N'aa', N'aa', N'man', N'看书, 玩游戏')
INSERT [dbo].[userinfo] ([id], [username], [password], [sex], [interest]) VALUES (20, N'asda', N'asda', N'man', N'爬山, 钓鱼')
INSERT [dbo].[userinfo] ([id], [username], [password], [sex], [interest]) VALUES (23, N'ass', N'ass', N'man', N'看书, 玩游戏')
INSERT [dbo].[userinfo] ([id], [username], [password], [sex], [interest]) VALUES (24, N'aas', N'aas', N'man', N'玩游戏')
INSERT [dbo].[userinfo] ([id], [username], [password], [sex], [interest]) VALUES (26, N'zzz', N'zzz', N'man', N'看书, 玩游戏')
INSERT [dbo].[userinfo] ([id], [username], [password], [sex], [interest]) VALUES (29, N'zjh', N'zjh', N'man', N'看书, 玩游戏')
SET IDENTITY_INSERT [dbo].[userinfo] OFF
/****** Object:  Table [dbo].[product]    Script Date: 06/11/2021 17:06:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[product](
	[id] [int] NOT NULL,
	[name] [char](30) NOT NULL,
	[sort] [int] NULL,
	[price] [float] NOT NULL,
	[oneprice] [float] NULL,
	[img] [char](50) NOT NULL,
	[date] [char](10) NOT NULL,
	[sale] [int] NULL,
	[face] [char](30) NULL,
	[body] [char](30) NULL,
	[length] [float] NULL,
	[quantity] [int] NULL,
	[source] [char](50) NULL,
 CONSTRAINT [PK_product] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (1, N'油漆边双色龙骨扇_粉色         ', 1, 18, 25, N'Picture/1.jpg                                     ', N'2011-07-03', 86, N'真丝                          ', N'头青加厚                      ', 21, 15, N'Picture/source/d1.jpg                             ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (2, N'油漆边双色龙骨扇_红色         ', 1, 18, 25, N'Picture/2.jpg                                     ', N'2011-07-03', 5, N'真丝                          ', N'头青加厚                      ', 21, 15, N'Picture/source/d2.jpg                             ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (3, N'油漆边双色龙骨扇_蓝色         ', 1, 18, 25, N'Picture/3.jpg                                     ', N'2011-07-03', 9, N'真丝                          ', N'头青加厚                      ', 21, 15, N'Picture/source/d3.jpg                             ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (4, N'油漆边双色龙骨扇_紫色         ', 1, 18, 25, N'Picture/4.jpg                                     ', N'2011-07-03', 2, N'真丝                          ', N'头青加厚                      ', 21, 15, N'Picture/source/d4.jpg                             ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (5, N'短梢手绘折扇_梅花             ', 1, 19, 28, N'Picture/5.jpg                                     ', N'2011-07-03', 6, N'仿真丝                        ', N'头青                          ', 22, 42, N'Picture/source/d5.jpg                             ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (6, N'短梢手绘折扇_桃花             ', 1, 19, 28, N'Picture/6.jpg                                     ', N'2011-07-03', 10, N'仿真丝                        ', N'头青                          ', 22, 42, N'Picture/source/d6.jpg                             ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (7, N'短梢手绘折扇_茶花             ', 1, 19, 28, N'Picture/7.jpg                                     ', N'2011-11-13', 3, N'仿真丝                        ', N'头青                          ', 22, 42, N'Picture/source/d7.jpg                             ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (8, N'短梢手绘折扇_牡丹             ', 1, 19, 28, N'Picture/8.jpg                                     ', N'2011-11-13', 7, N'仿真丝                        ', N'头青                          ', 22, 42, N'Picture/source/d8.jpg                             ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (9, N'短梢手绘折扇_兰花             ', 1, 19, 28, N'Picture/9.jpg                                     ', N'2011-11-13', 11, N'仿真丝                        ', N'头青                          ', 22, 42, N'Picture/source/d9.jpg                             ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (10, N'出口日本清凉折扇_蓝色         ', 1, 5, 8, N'Picture/10.jpg                                    ', N'2011-11-13', 12, N'仿真丝                        ', N'二青                          ', 21, 28, N'Picture/source/d10.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (11, N'出口日本清凉折扇_红色         ', 1, 5, 8, N'Picture/11.jpg                                    ', N'2011-11-13', 8, N'仿真丝                        ', N'二青                          ', 21, 28, N'Picture/source/d11.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (12, N'出口日本清凉折扇_绿色         ', 1, 5, 8, N'Picture/12.jpg                                    ', N'2011-11-15', 2, N'仿真丝                        ', N'二青                          ', 21, 28, N'Picture/source/d12.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (13, N'出口日本清凉折扇_紫色         ', 1, 5, 8, N'Picture/13.jpg                                    ', N'2011-11-15', 65, N'仿真丝                        ', N'二青                          ', 21, 28, N'Picture/source/d13.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (14, N'蓝骨手绘梅花扇                ', 1, 9.9, 15, N'Picture/14.jpg                                    ', N'2011-11-15', 59, N'真丝                          ', N'头青                          ', 21, 30, N'Picture/source/d14.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (15, N'金陵十二钗                    ', 1, 8, 12, N'Picture/15.jpg                                    ', N'2011-11-15', 11, N'仿真丝                        ', N'二青                          ', 21, 30, N'Picture/source/d15.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (16, N'黑骨便携折扇_银色             ', 1, 5.5, 9, N'Picture/16.jpg                                    ', N'2011-11-15', 1, N'涤塔夫                        ', N'二青                          ', 21, 28, N'Picture/source/d16.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (17, N'黑骨便携折扇_金色             ', 1, 5.5, 9, N'Picture/17.jpg                                    ', N'2011-11-15', 2, N'涤塔夫                        ', N'二青                          ', 21, 28, N'Picture/source/d17.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (18, N'棕骨波浪真丝扇_棕             ', 1, 11, 16, N'Picture/18.jpg                                    ', N'2011-11-15', 0, N'真丝                          ', N'头青加厚                      ', 21, 15, N'Picture/source/d18.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (19, N'棕骨波浪真丝扇_蓝             ', 1, 11, 16, N'Picture/19.jpg                                    ', N'2011-11-15', 0, N'真丝                          ', N'头青加厚                      ', 21, 15, N'Picture/source/d19.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (20, N'单色棉布折扇_咖啡             ', 1, 9.9, 15, N'Picture/20.jpg                                    ', N'2011-11-15', 0, N'棉布                          ', N'头青加厚                      ', 21, 15, N'Picture/source/d20.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (21, N'单色棉布折扇_白红             ', 1, 9.9, 15, N'Picture/21.jpg                                    ', N'2011-11-15', 0, N'棉布                          ', N'头青加厚                      ', 21, 15, N'Picture/source/d21.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (22, N'单色棉布折扇_棕色             ', 1, 9.9, 15, N'Picture/22.jpg                                    ', N'2011-11-15', 0, N'棉布                          ', N'头青加厚                      ', 21, 15, N'Picture/source/d22.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (23, N'单色棉布折扇_蓝色             ', 1, 9.9, 15, N'Picture/23.jpg                                    ', N'2011-11-15', 0, N'棉布                          ', N'头青加厚                      ', 21, 15, N'Picture/source/d23.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (24, N'单色棉布折扇_花色             ', 1, 9.9, 15, N'Picture/24.jpg                                    ', N'2011-11-15', 0, N'棉布                          ', N'头青加厚                      ', 21, 15, N'Picture/source/d24.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (25, N'单色棉布折扇_绿白             ', 1, 9.9, 15, N'Picture/25.jpg                                    ', N'2011-11-15', 0, N'棉布                          ', N'头青加厚                      ', 21, 15, N'Picture/source/d25.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (26, N'纸面清凉扇_女人               ', 1, 5, 8, N'Picture/26.jpg                                    ', N'2011-11-15', 0, N'纸面                          ', N'二青                          ', 21, 28, N'Picture/source/d26.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (27, N'纸面清凉扇_男人               ', 1, 5, 8, N'Picture/27.jpg                                    ', N'2011-11-15', 0, N'纸面                          ', N'二青                          ', 21, 28, N'Picture/source/d27.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (28, N'纳凉纸扇_黑白面               ', 1, 4.5, 6, N'Picture/28.jpg                                    ', N'2011-11-15', 0, N'纸面                          ', N'二青                          ', 21, 25, N'Picture/source/d28.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (29, N'纳凉纸扇_三色面               ', 1, 4.5, 6, N'Picture/29.jpg                                    ', N'2011-11-15', 0, N'纸面                          ', N'二青                          ', 21, 25, N'Picture/source/d29.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (30, N'纳凉纸扇_金鱼                 ', 1, 4.5, 6, N'Picture/30.jpg                                    ', N'2011-11-15', 0, N'纸面                          ', N'二青                          ', 21, 25, N'Picture/source/d30.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (31, N'9寸18方油竹节男扇_梅花        ', 2, 20, 30, N'Picture/31.jpg                                    ', N'2011-11-16', 0, N'纸面                          ', N'头青                          ', 30, 18, N'Picture/source/d31.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (32, N'9寸18方油竹节男扇_牡丹        ', 2, 20, 30, N'Picture/32.jpg                                    ', N'2011-11-16', 0, N'纸面                          ', N'头青                          ', 30, 18, N'Picture/source/d32.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (33, N'9寸18方油竹节男扇_竹          ', 2, 20, 30, N'Picture/33.jpg                                    ', N'2011-11-16', 0, N'纸面                          ', N'头青                          ', 30, 18, N'Picture/source/d33.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (34, N'9寸18方油竹节男扇_菊花        ', 2, 20, 30, N'Picture/34.jpg                                    ', N'2011-11-16', 0, N'纸面                          ', N'头青                          ', 30, 18, N'Picture/source/d34.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (35, N'1尺20方宽版男扇_山水          ', 2, 25, 35, N'Picture/35.jpg                                    ', N'2011-11-16', 0, N'纸面                          ', N'头青                          ', 33, 20, N'Picture/source/d35.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (36, N'1尺13方宽版男扇_下棋          ', 2, 26, 38, N'Picture/36.jpg                                    ', N'2011-11-16', 0, N'纸面                          ', N'头青                          ', 33, 13, N'Picture/source/d36.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (37, N'1尺20方油竹节折扇_二女        ', 2, 26, 38, N'Picture/37.jpg                                    ', N'2011-11-16', 0, N'纸面                          ', N'头青                          ', 33, 20, N'Picture/source/d37.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (38, N'9寸18方花式头名贵扇骨(单把)   ', 2, 1800, 2200, N'Picture/38.jpg                                    ', N'2011-11-16', 4, N'洒金白面                      ', N'头青                          ', 30, 18, N'Picture/source/d38.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (39, N'1尺15方黑色宽版折扇_花        ', 2, 25, 35, N'Picture/39.jpg                                    ', N'2011-11-16', 0, N'纸面                          ', N'头青                          ', 33, 15, N'Picture/source/d39.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (40, N'1尺15方黑色宽版折扇_龙        ', 2, 22, 30, N'Picture/40.jpg                                    ', N'2011-11-16', 0, N'娟                            ', N'头青                          ', 33, 15, N'Picture/source/d40.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (41, N'9寸18方油炸骨折扇_龙          ', 2, 18, 25, N'Picture/41.jpg                                    ', N'2011-11-16', 0, N'纸面                          ', N'头青                          ', 30, 18, N'Picture/source/d41.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (42, N'1尺15方仿红木折扇_孔子        ', 2, 22, 30, N'Picture/42.jpg                                    ', N'2011-11-16', 0, N'纸面                          ', N'头青                          ', 33, 15, N'Picture/source/d42.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (43, N'1尺15方油竹节折扇_国色天香    ', 2, 25, 35, N'Picture/43.jpg                                    ', N'2011-11-16', 52, N'纸面                          ', N'头青                          ', 33, 15, N'Picture/source/d43.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (44, N'1尺15方仿红木折扇_梅兰竹菊    ', 2, 22, 30, N'Picture/44.jpg                                    ', N'2011-11-16', 0, N'娟                            ', N'头青                          ', 33, 15, N'Picture/source/d44.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (45, N'9*18全手工真丝扇面名家手绘    ', 2, 280, 300, N'Picture/45.jpg                                    ', N'2011-11-16', 0, N'真丝                          ', N'头青                          ', 30, 18, N'Picture/source/d45.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (46, N'手绘国画竹节雕刻韩国扇_梅花   ', 3, 12, 16, N'Picture/46.jpg                                    ', N'2011-11-16', 66, N'宣纸                          ', N'二青                          ', 22, 24, N'Picture/source/d46.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (47, N'手绘国画竹节雕刻韩国扇_兰花   ', 3, 12, 16, N'Picture/47.jpg                                    ', N'2011-11-16', 0, N'宣纸                          ', N'二青                          ', 22, 24, N'Picture/source/d47.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (48, N'手绘国画竹节雕刻韩国扇_菊花   ', 3, 12, 16, N'Picture/48.jpg                                    ', N'2011-11-16', 0, N'宣纸                          ', N'二青                          ', 22, 24, N'Picture/source/d48.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (49, N'蓝色贴牙白面韩国扇_中号       ', 3, 18, 25, N'Picture/49.jpg                                    ', N'2011-11-16', 0, N'宣纸                          ', N'头青                          ', 25, 28, N'Picture/source/d49.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (50, N'原色大竹节白面韩国扇          ', 3, 28, 35, N'Picture/50.jpg                                    ', N'2011-11-16', 0, N'宣纸                          ', N'头青                          ', 22, 24, N'Picture/source/d50.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (51, N'棕色贴牙白面韩国扇_大号       ', 3, 19, 26, N'Picture/51.jpg                                    ', N'2011-11-16', 0, N'宣纸                          ', N'头青                          ', 30, 30, N'Picture/source/d51.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (52, N'铜钉手绘韩国扇_春             ', 3, 25, 35, N'Picture/52.jpg                                    ', N'2011-11-16', 7, N'宣纸                          ', N'头青                          ', 30, 30, N'Picture/source/d52.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (53, N'铜钉手绘韩国扇_松树           ', 3, 25, 35, N'Picture/53.jpg                                    ', N'2011-11-16', 0, N'宣纸                          ', N'头青                          ', 30, 30, N'Picture/source/d53.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (54, N'铜钉手绘韩国扇_冬             ', 3, 25, 35, N'Picture/54.jpg                                    ', N'2011-11-16', 0, N'宣纸                          ', N'头青                          ', 30, 30, N'Picture/source/d54.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (55, N'铜钉手绘韩国扇_秋             ', 3, 25, 35, N'Picture/55.jpg                                    ', N'2011-11-16', 19, N'宣纸                          ', N'头青                          ', 30, 30, N'Picture/source/d55.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (56, N'铜钉手绘韩国扇_夏             ', 3, 25, 35, N'Picture/56.jpg                                    ', N'2011-11-16', 0, N'宣纸                          ', N'头青                          ', 30, 30, N'Picture/source/d56.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (57, N'铜钉手绘韩国扇_梅花           ', 3, 25, 35, N'Picture/57.jpg                                    ', N'2011-11-16', 0, N'宣纸                          ', N'头青                          ', 30, 30, N'Picture/source/d57.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (58, N'铜钉手绘韩国扇_兰花           ', 3, 25, 35, N'Picture/58.jpg                                    ', N'2011-11-16', 0, N'宣纸                          ', N'头青                          ', 30, 30, N'Picture/source/d58.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (59, N'铜钉手绘韩国扇_竹             ', 3, 25, 35, N'Picture/59.jpg                                    ', N'2011-11-16', 0, N'宣纸                          ', N'头青                          ', 30, 30, N'Picture/source/d59.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (60, N'铜钉手绘韩国扇_牡丹           ', 3, 25, 35, N'Picture/60.jpg                                    ', N'2011-11-16', 0, N'宣纸                          ', N'头青                          ', 30, 30, N'Picture/source/d60.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (61, N'白面贴牙韩国扇_小号           ', 3, 16, 23, N'Picture/61.jpg                                    ', N'2011-11-16', 0, N'宣纸                          ', N'头青                          ', 22, 24, N'Picture/source/d61.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (62, N'棕色碳化韩国扇_绿色           ', 3, 9, 15, N'Picture/62.jpg                                    ', N'2011-11-16', 0, N'宣纸                          ', N'二青                          ', 22, 35, N'Picture/source/d62.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (63, N'棕色碳化韩国扇_黄色           ', 3, 9, 15, N'Picture/63.jpg                                    ', N'2011-11-16', 0, N'宣纸                          ', N'二青                          ', 22, 35, N'Picture/source/d63.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (64, N'紫檀木镂空雕刻工艺扇_园林     ', 4, 580, 680, N'Picture/64.jpg                                    ', N'2011-11-17', 0, N'紫檀木                        ', N'紫檀木                        ', 23, 0, N'Picture/source/d64.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (65, N'紫檀木镂空雕刻工艺扇_梅花     ', 4, 580, 680, N'Picture/65.jpg                                    ', N'2011-11-17', 3, N'紫檀木                        ', N'紫檀木                        ', 23, 0, N'Picture/source/d65.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (66, N'黑檀木镂空雕刻工艺扇_梅妃     ', 4, 580, 680, N'Picture/66.jpg                                    ', N'2011-11-17', 1, N'黑檀木                        ', N'黑檀木                        ', 23, 0, N'Picture/source/d66.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (67, N'紫檀木檀香扇_苏州园林         ', 4, 580, 680, N'Picture/67.jpg                                    ', N'2011-11-17', 0, N'紫檀木                        ', N'紫檀木                        ', 23, 0, N'Picture/source/d67.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (68, N'11款卡通折扇（单把价格）      ', 5, 15, 90, N'Picture/68.jpg                                    ', N'2011-11-18', 111, N'真丝                          ', N'头青                          ', 21, 30, N'Picture/source/d68.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (69, N'minnie mouse米妮              ', 5, 15, 90, N'Picture/69.jpg                                    ', N'2011-11-18', 6, N'真丝                          ', N'头青                          ', 21, 30, N'Picture/source/d69.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (70, N'10款hello kitty_黑            ', 5, 15, 90, N'Picture/70.jpg                                    ', N'2011-11-18', 32, N'真丝                          ', N'头青                          ', 21, 30, N'Picture/source/d70.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (71, N'10款hello kitty_粉            ', 5, 15, 90, N'Picture/71.jpg                                    ', N'2011-11-18', 0, N'真丝                          ', N'头青                          ', 21, 30, N'Picture/source/d71.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (72, N'09款hello kitty_粉            ', 5, 15, 90, N'Picture/72.jpg                                    ', N'2011-11-18', 0, N'真丝                          ', N'头青                          ', 21, 30, N'Picture/source/d72.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (73, N'表情帝艾鲁猫                  ', 5, 9, 70, N'Picture/73.jpg                                    ', N'2011-11-18', 5, N'涤塔夫                        ', N'二青                          ', 21, 30, N'Picture/source/d73.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (74, N'动漫怪物猎人MH                ', 5, 9, 70, N'Picture/74.jpg                                    ', N'2011-11-18', 1, N'涤塔夫                        ', N'二青                          ', 21, 30, N'Picture/source/d74.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (75, N'动漫怪物猎人MH                ', 5, 9, 70, N'Picture/75.jpg                                    ', N'2011-11-18', 0, N'涤塔夫                        ', N'二青                          ', 21, 30, N'Picture/source/d75.jpg                            ')
INSERT [dbo].[product] ([id], [name], [sort], [price], [oneprice], [img], [date], [sale], [face], [body], [length], [quantity], [source]) VALUES (76, N'Mickey Mouse                  ', 5, 9, 70, N'Picture/76.jpg                                    ', N'2011-11-18', 22, N'纸面                          ', N'二青                          ', 21, 30, N'Picture/source/d76.jpg                            ')
/****** Object:  Table [dbo].[cart]    Script Date: 06/11/2021 17:06:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cart](
	[cartid] [bigint] IDENTITY(1,1) NOT NULL,
	[username] [nvarchar](30) NOT NULL,
	[productid] [bigint] NOT NULL,
	[count] [int] NOT NULL,
 CONSTRAINT [PK_cart] PRIMARY KEY CLUSTERED 
(
	[cartid] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[cart] ON
INSERT [dbo].[cart] ([cartid], [username], [productid], [count]) VALUES (1, N'w', 1, 2)
INSERT [dbo].[cart] ([cartid], [username], [productid], [count]) VALUES (2, N'w', 3, 1)
INSERT [dbo].[cart] ([cartid], [username], [productid], [count]) VALUES (3, N'l', 2, 3)
INSERT [dbo].[cart] ([cartid], [username], [productid], [count]) VALUES (6, N'null', 1, 1)
INSERT [dbo].[cart] ([cartid], [username], [productid], [count]) VALUES (15, N'a', 3, 2)
INSERT [dbo].[cart] ([cartid], [username], [productid], [count]) VALUES (17, N'a', 8, 4)
INSERT [dbo].[cart] ([cartid], [username], [productid], [count]) VALUES (18, N'a', 1, 1)
INSERT [dbo].[cart] ([cartid], [username], [productid], [count]) VALUES (19, N'a', 2, 3)
INSERT [dbo].[cart] ([cartid], [username], [productid], [count]) VALUES (20, N's', 3, 3)
SET IDENTITY_INSERT [dbo].[cart] OFF
/****** Object:  ForeignKey [FK_cart_userinfo]    Script Date: 06/11/2021 17:06:54 ******/
ALTER TABLE [dbo].[cart]  WITH CHECK ADD  CONSTRAINT [FK_cart_userinfo] FOREIGN KEY([cartid])
REFERENCES [dbo].[cart] ([cartid])
GO
ALTER TABLE [dbo].[cart] CHECK CONSTRAINT [FK_cart_userinfo]
GO
