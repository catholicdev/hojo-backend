CREATE TABLE `book` (
  `id` varchar(36) NOT NULL,
  `book_type` enum('oldtestament','newtestament') NOT NULL,
  `book_code` varchar(255) DEFAULT NULL,
  `abbreviation` varchar(255) NOT NULL,
  `total_chapter` int DEFAULT NULL,
  `total_pillar` int DEFAULT NULL,
  `book_group` enum('none','pentateuch') NOT NULL,
  `book_name` text NOT NULL,
  `book_summary` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
