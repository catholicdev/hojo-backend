CREATE TABLE `question` (
  `id` varchar(36) NOT NULL,
  `stage_id` varchar(255) NOT NULL,
  `question` text NOT NULL,
  `question_level` enum('easy','medium','hard') NOT NULL,
  `question_score` int DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c637a0e6bf4fc0325a39f225c37` (`stage_id`),
  CONSTRAINT `FK_c637a0e6bf4fc0325a39f225c37` FOREIGN KEY (`stage_id`) REFERENCES `stage` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
