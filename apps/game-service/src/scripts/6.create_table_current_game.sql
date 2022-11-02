CREATE TABLE `current_game` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `stage_id` varchar(255) NOT NULL,
  `end_game_id` varchar(255) DEFAULT NULL,
  `help_used` text,
  `start_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_completed` tinyint DEFAULT NULL,
  `completed_date` timestamp NULL DEFAULT NULL,
  `is_passed` tinyint DEFAULT NULL,
  `passed_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_5c82678ec8bd3d295e9971387c` (`end_game_id`),
  KEY `FK_092dface4d11d3b74080f48b886` (`stage_id`),
  CONSTRAINT `FK_092dface4d11d3b74080f48b886` FOREIGN KEY (`stage_id`) REFERENCES `stage` (`id`),
  CONSTRAINT `FK_5c82678ec8bd3d295e9971387c7` FOREIGN KEY (`end_game_id`) REFERENCES `end_game` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;