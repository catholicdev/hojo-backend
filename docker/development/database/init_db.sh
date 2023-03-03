#!/bin/bash

collect_bible() {
  rm -Rf 0_bible.sql
  cat ./create_database_bible.sql >0_bible.sql
  cat ../../../apps/bible-service/src/scripts/*.sql >>0_bible.sql
  cat ../../../apps/bible-service/src/scripts/data/*.sql >>0_bible.sql
}

collect_game() {
  rm -Rf 1_game.sql
  cat ./create_database_game.sql >1_game.sql
  cat ../../../apps/game-service/src/scripts/*.sql >>1_game.sql
  cat ../../../apps/game-service/src/scripts/data/*.sql >>1_game.sql
}

collect_user() {
  rm -Rf 2_user.sql
  cat ./create_database_user.sql >2_user.sql
  cat ../../../apps/user-service/src/scripts/*.sql >>2_user.sql
  cat ../../../apps/user-service/src/scripts/data/*.sql >>2_user.sql
}

collect_bible
docker exec -i development-mysql-1 mysql --default-character-set=utf8mb4 -uroot -p123456 <./0_bible.sql
rm -Rf 0_bible.sql

collect_game
docker exec -i development-mysql-1 mysql --default-character-set=utf8mb4 -uroot -p123456 <./1_game.sql
rm -Rf 1_game.sql

collect_user
docker exec -i development-mysql-1 mysql --default-character-set=utf8mb4 -uroot -p123456 <./2_user.sql
rm -Rf 2_user.sql

echo 'Done!'
