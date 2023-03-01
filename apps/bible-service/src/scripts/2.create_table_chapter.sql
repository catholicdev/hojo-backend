CREATE TABLE `chapter` (
  `id` varchar(36) NOT NULL,
  `book_id` varchar(255) NOT NULL,
  `chapter_code` varchar(255) DEFAULT NULL,
  `chapter_sequence` varchar(255) NOT NULL,
  `chapter_name` text,
  `chapter_summary` text,
  PRIMARY KEY (`id`),
  KEY `FK_5764293646b6746cc5c5ff9173d` (`book_id`),
  CONSTRAINT `FK_5764293646b6746cc5c5ff9173d` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
