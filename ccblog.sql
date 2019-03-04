/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50715
Source Host           : localhost:3306
Source Database       : ccblog

Target Server Type    : MYSQL
Target Server Version : 50715
File Encoding         : 65001

Date: 2019-03-04 20:34:44
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT '',
  `content` varchar(2000) DEFAULT '',
  `likecount` varchar(255) DEFAULT '0',
  `readcount` varchar(255) DEFAULT '0',
  `label` varchar(255) DEFAULT NULL,
  `updatetime` datetime DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  `authorid` int(11) DEFAULT NULL,
  `authorname` varchar(255) DEFAULT '',
  `coverimg` varchar(255) DEFAULT '' COMMENT '封面图',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('2', '232福利都卡死了的拉力赛的看商量大事大师的；‘地方上的裂缝；胜多负少；’的发顺风顺丰的；‘是受打击啊是打开拉萨大理石·dfsddfs发；士大夫；发；电风扇；’分类方式浪费', '<p>阿三顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶</p>', '3', '18', 'ss', '2019-03-04 20:07:56', '2019-03-02 23:24:59', null, null, 'http://su.semmv.com/wp-content/uploads/2016/06/2016062810005687.jpg');
INSERT INTO `article` VALUES ('3', '232福利都卡死了的拉力赛的看商量大事大师的；‘地方上的裂缝；胜多负少；’的发顺风顺丰的；‘是受打击啊是打开拉萨大理石·dfsddfs发；士大夫；发；电风扇；’分类方式浪费', '111', '1', '3', 'ss', '2019-03-02 23:24:56', '2019-03-02 23:24:59', null, null, 'http://su.semmv.com/wp-content/uploads/2016/05/2018112510182458.jpg');
INSERT INTO `article` VALUES ('4', '232福利都卡死了的拉力赛的看商量大事大师的；‘地方上的裂缝；胜多负少；’的发顺风顺丰的；‘是受打击啊是打开拉萨大理石·dfsddfs发；士大夫；发；电风扇；’分类方式浪费', '111', '1', '4', 'ss', '2019-03-02 23:24:56', '2019-03-02 23:24:59', null, null, 'http://su.semmv.com/wp-content/uploads/2016/03/2018112510190374.jpg');
INSERT INTO `article` VALUES ('5', '232福利都卡死了的拉力赛的看商量大事大师的；‘地方上的裂缝；胜多负少；’的发顺风顺丰的；‘是受打击啊是打开拉萨大理石·dfsddfs发；士大夫；发；电风扇；’分类方式浪费', '111', '1', '3', 'ss', '2019-03-02 23:24:56', '2019-03-02 23:24:59', null, null, 'http://su.semmv.com/wp-content/uploads/2016/01/2018112510575031.jpg');
INSERT INTO `article` VALUES ('6', '232福利都卡死了的拉力赛的看商量大事大师的；‘地方上的裂缝；胜多负少；’的发顺风顺丰的；‘是受打击啊是打开拉萨大理石·dfsddfs发；士大夫；发；电风扇；’分类方式浪费', '<p>阿三顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶</p>', '3', '18', 'ss', '2019-03-04 20:07:56', '2019-03-02 23:24:59', null, null, 'http://su.semmv.com/wp-content/uploads/2016/06/2016062810005687.jpg');
INSERT INTO `article` VALUES ('7', '232福利都卡死了的拉力赛的看商量大事大师的；‘地方上的裂缝；胜多负少；’的发顺风顺丰的；‘是受打击啊是打开拉萨大理石·dfsddfs发；士大夫；发；电风扇；’分类方式浪费', '111', '1', '3', 'ss', '2019-03-02 23:24:56', '2019-03-02 23:24:59', null, null, 'http://su.semmv.com/wp-content/uploads/2016/05/2018112510182458.jpg');
INSERT INTO `article` VALUES ('8', '232福利都卡死了的拉力赛的看商量大事大师的；‘地方上的裂缝；胜多负少；’的发顺风顺丰的；‘是受打击啊是打开拉萨大理石·dfsddfs发；士大夫；发；电风扇；’分类方式浪费', '111', '1', '4', 'ss', '2019-03-02 23:24:56', '2019-03-02 23:24:59', null, null, 'http://su.semmv.com/wp-content/uploads/2016/03/2018112510190374.jpg');
INSERT INTO `article` VALUES ('9', '232福利都卡死了的拉力赛的看商量大事大师的；‘地方上的裂缝；胜多负少；’的发顺风顺丰的；‘是受打击啊是打开拉萨大理石·dfsddfs发；士大夫；发；电风扇；’分类方式浪费', '111', '1', '3', 'ss', '2019-03-02 23:24:56', '2019-03-02 23:24:59', null, null, 'http://su.semmv.com/wp-content/uploads/2016/01/2018112510575031.jpg');
INSERT INTO `article` VALUES ('10', '232福利都卡死了的拉力赛的看商量大事大师的；‘地方上的裂缝；胜多负少；’的发顺风顺丰的；‘是受打击啊是打开拉萨大理石·dfsddfs发；士大夫；发；电风扇；’分类方式浪费', '111', '1', '3', 'ss', '2019-03-02 23:24:56', '2019-03-02 23:24:59', null, null, 'http://su.semmv.com/wp-content/uploads/2016/05/2018112510182458.jpg');
INSERT INTO `article` VALUES ('11', '232福利都卡死了的拉力赛的看商量大事大师的；‘地方上的裂缝；胜多负少；’的发顺风顺丰的；‘是受打击啊是打开拉萨大理石·dfsddfs发；士大夫；发；电风扇；’分类方式浪费', '111', '1', '4', 'ss', '2019-03-02 23:24:56', '2019-03-02 23:24:59', null, null, 'http://su.semmv.com/wp-content/uploads/2016/03/2018112510190374.jpg');
INSERT INTO `article` VALUES ('12', '232福利都卡死了的拉力赛的看商量大事大师的；‘地方上的裂缝；胜多负少；’的发顺风顺丰的；‘是受打击啊是打开拉萨大理石·dfsddfs发；士大夫；发；电风扇；’分类方式浪费', '111', '1', '3', 'ss', '2019-03-02 23:24:56', '2019-03-02 23:24:59', null, null, 'http://su.semmv.com/wp-content/uploads/2016/01/2018112510575031.jpg');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `username` varchar(255) DEFAULT '',
  `articleid` int(11) DEFAULT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `parentid` int(11) DEFAULT '0',
  `touserid` int(11) DEFAULT NULL,
  `tousername` varchar(255) DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  `updatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_articleid` (`articleid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('1', '0', '网友', '2', '三大三大没', '0', null, null, '2019-03-03 18:20:41', '2019-03-03 18:20:44');
INSERT INTO `comment` VALUES ('2', '0', '网友', '2', '撒大苏打大', '0', null, null, '2019-03-03 18:20:41', '2019-03-03 18:20:44');
INSERT INTO `comment` VALUES ('9', '0', '网友', '2', '三大矿山打算考虑的是看大陆多少', '0', null, null, '2019-03-03 19:55:27', '2019-03-03 19:55:27');
INSERT INTO `comment` VALUES ('10', '0', '网友', '2', '三大矿山打算考虑的是看大陆多少', '0', null, null, '2019-03-03 19:55:31', '2019-03-03 19:55:31');
INSERT INTO `comment` VALUES ('13', '0', '网友', '2', '委屈委屈饿为撒大苏打', '0', null, null, '2019-03-03 20:02:15', '2019-03-03 20:02:15');
INSERT INTO `comment` VALUES ('14', '0', '网友', '2', '委屈委屈饿为撒大苏打', '0', null, null, '2019-03-03 20:05:36', '2019-03-03 20:05:36');
INSERT INTO `comment` VALUES ('15', '0', '网友', '2', '问请问请问实打实大苏打', '0', null, null, '2019-03-03 20:05:57', '2019-03-03 20:05:57');
INSERT INTO `comment` VALUES ('16', '0', '网友', '2', '恶趣味请问请问', '0', null, null, '2019-03-03 20:32:51', '2019-03-03 20:32:51');
INSERT INTO `comment` VALUES ('17', '0', '网友', '2', '围墙围起围墙是多少', '0', null, null, '2019-03-03 20:34:23', '2019-03-03 20:34:23');

-- ----------------------------
-- Table structure for liuyan
-- ----------------------------
DROP TABLE IF EXISTS `liuyan`;
CREATE TABLE `liuyan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `reply` varchar(255) DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  `replytime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of liuyan
-- ----------------------------
INSERT INTO `liuyan` VALUES ('3', '猥琐大叔的', null, '2019-03-04 20:25:18', null);
INSERT INTO `liuyan` VALUES ('4', '啊实打实大', null, '2019-03-04 20:26:09', null);
INSERT INTO `liuyan` VALUES ('5', '啊实打实大阿斯顿', null, '2019-03-04 20:26:13', null);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `pwd` varchar(255) DEFAULT NULL,
  `nick` varchar(255) DEFAULT NULL,
  `updatetime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `createtime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', '111111', 'admin', '2019-03-04 19:36:03', '2019-03-04 19:36:03');
