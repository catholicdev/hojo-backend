CREATE TABLE `stage` (
  `id` varchar(36) NOT NULL,
  `round_id` varchar(255) NOT NULL,
  `book_id` varchar(255) NOT NULL,
  `stage_reward_id` varchar(255) DEFAULT NULL,
  `stage_name` varchar(255) NOT NULL,
  `detail` text NOT NULL,
  `total_question` int NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_2c63a6a88bec54e291bbcbdb96f` (`round_id`),
  CONSTRAINT `FK_2c63a6a88bec54e291bbcbdb96f` FOREIGN KEY (`round_id`) REFERENCES `round` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
