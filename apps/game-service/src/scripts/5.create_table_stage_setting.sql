CREATE TABLE `stage_setting` (
  `id` varchar(36) NOT NULL,
  `stage_id` varchar(255) NOT NULL,
  `next_stage_id` varchar(255) NOT NULL,
  `stage_reward_id` varchar(255) DEFAULT NULL,
  `helps` text,
  `total_question` int DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
