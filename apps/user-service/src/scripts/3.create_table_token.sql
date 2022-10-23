CREATE TABLE `token` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `expired_at` datetime NOT NULL,
  `userId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_94f168faad896c0786646fa3d4a` (`userId`),
  CONSTRAINT `FK_94f168faad896c0786646fa3d4a` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;