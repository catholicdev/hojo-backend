CREATE TABLE `game_result` (
  `id` varchar(36) NOT NULL,
  `game_code` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `total_question_passed` int DEFAULT NULL,
  `total_score` int DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_237396b5b003e670a6161c6be0` (`game_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
