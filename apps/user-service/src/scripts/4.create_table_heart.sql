CREATE TABLE `heart` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `current_heart` int NOT NULL,
  `max_heart` int NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_6fd3e2fe63a49e22e79ab7c60b` (`user_id`),
  CONSTRAINT `FK_6fd3e2fe63a49e22e79ab7c60b0` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
