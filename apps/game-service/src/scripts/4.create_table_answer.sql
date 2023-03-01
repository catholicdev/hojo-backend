CREATE TABLE `answer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question_id` varchar(255) NOT NULL,
  `answer` text NOT NULL,
  `is_answer` tinyint NOT NULL,
  `is_show_fifty_fifty` tinyint NOT NULL,
  `answer_detail` text,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c3d19a89541e4f0813f2fe09194` (`question_id`),
  CONSTRAINT `FK_c3d19a89541e4f0813f2fe09194` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
