CREATE TABLE `sentence` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chapter_id` varchar(255) NOT NULL,
  `pillar_id` varchar(255) DEFAULT NULL,
  `sentence_sequence` int NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_62b752faaae84d6c635523e30e7` (`chapter_id`),
  KEY `FK_bcc3060880722b7b0cb3117194e` (`pillar_id`),
  CONSTRAINT `FK_62b752faaae84d6c635523e30e7` FOREIGN KEY (`chapter_id`) REFERENCES `chapter` (`id`),
  CONSTRAINT `FK_bcc3060880722b7b0cb3117194e` FOREIGN KEY (`pillar_id`) REFERENCES `pillar` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
