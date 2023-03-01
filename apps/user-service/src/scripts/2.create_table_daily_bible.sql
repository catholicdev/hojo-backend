CREATE TABLE `daily_bible` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `book_abbreviation` varchar(255) NOT NULL,
  `chapter_sequence` int NOT NULL,
  `sentence_sequence` int NOT NULL,
  `sentence` varchar(255) NOT NULL,
  `receive_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_551e61e0435c4ca30fa2747992e` (`user_id`),
  CONSTRAINT `FK_551e61e0435c4ca30fa2747992e` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
