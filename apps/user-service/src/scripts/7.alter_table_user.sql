ALTER TABLE `hj_user`.`user` 
ADD COLUMN `password_hash` VARCHAR(200) NOT NULL AFTER `email`;