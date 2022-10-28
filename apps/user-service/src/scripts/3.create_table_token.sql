CREATE TABLE `token` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `expired_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e50ca89d635960fda2ffeb17639` (`user_id`),
  CONSTRAINT `FK_e50ca89d635960fda2ffeb17639` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
