ALTER TABLE `book`
MODIFY COLUMN `book_group` enum('none','pentateuch', 'history', 'wisdom', 'prophet', 'gospel', 'historical_apostles', 'epistles', 'revelation') NOT NULL;
