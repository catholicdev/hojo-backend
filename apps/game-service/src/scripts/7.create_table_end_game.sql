CREATE TABLE `end_game` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `total_question_passed` int DEFAULT NULL,
  `total_score` int DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;