CREATE TABLE `heart-log` (
  `id` varchar(36) NOT NULL,
  `heart_id` varchar(255) NOT NULL,
  `current_heart` int NOT NULL,
  `quantity` int NOT NULL,
  `type` enum('increase','decrease') NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_d853e31380d654118272fae8348` (`heart_id`),
  CONSTRAINT `FK_d853e31380d654118272fae8348` FOREIGN KEY (`heart_id`) REFERENCES `heart` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;