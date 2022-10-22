CREATE TABLE `end_game` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `current_game_id` varchar(255) NOT NULL,
  `total_question_passed` int NOT NULL,
  `total_score` int NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_ed73615fcc7dd5d44930a80c56` (`current_game_id`),
  CONSTRAINT `FK_ed73615fcc7dd5d44930a80c56b` FOREIGN KEY (`current_game_id`) REFERENCES `current_game` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;