CREATE TABLE `pillar` (
  `id` varchar(36) NOT NULL,
  `book_id` varchar(255) NOT NULL,
  `pillar_sequence` int NOT NULL,
  `from_sentence` int DEFAULT NULL,
  `to_sentence` int DEFAULT NULL,
  `pillar_title` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_d36ed20a834f4a9d57c81ce062a` (`book_id`),
  CONSTRAINT `FK_d36ed20a834f4a9d57c81ce062a` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
