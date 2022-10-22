CREATE TABLE `current_game` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `stage_id` varchar(255) NOT NULL,
  `help_used` text NOT NULL,
  `stage_name` varchar(255) NOT NULL,
  `detail` text NOT NULL,
  `total_question` int NOT NULL,
  `start_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `completed_date` datetime DEFAULT NULL,
  `is_passed` tinyint DEFAULT NULL,
  `is_completed` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_092dface4d11d3b74080f48b886` (`stage_id`),
  CONSTRAINT `FK_092dface4d11d3b74080f48b886` FOREIGN KEY (`stage_id`) REFERENCES `stage` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
