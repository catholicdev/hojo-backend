@echo OFF

::collect_bible
  del "0_bible.sql"
  call type "./create_database_bible.sql" > "0_bible.sql"
  call type "..\..\..\apps\bible-service\src\scripts\*.sql" >> "0_bible.sql"
  call type "..\..\..\apps\bible-service\src\scripts\data\*.sql" >> "0_bible.sql"
  call docker exec -i development_mysql_1 mysql --default-character-set=utf8mb4 -uroot -p123456 <./0_bible.sql
  del "0_bible.sql"


::collect_game
  del "1_game.sql"
  call type "./create_database_game.sql" > 1_game.sql
  call type "..\..\..\apps\game-service\src\scripts\*.sql" >> 1_game.sql
  call type "..\..\..\apps\game-service\src\scripts\data\*.sql" >> 1_game.sql
  call docker exec -i development_mysql_1 mysql --default-character-set=utf8mb4 -uroot -p123456 <./1_game.sql
  del "1_game.sql"


::collect_user
  del "2_user.sql"
  call type "./create_database_user.sql" > 2_user.sql
  call type "..\..\..\apps\user-service\src\scripts\*.sql" >> 2_user.sql
  call type "..\..\..\apps\user-service\src\scripts\data\*.sql" >> 2_user.sql
  call docker exec -i development_mysql_1 mysql --default-character-set=utf8mb4 -uroot -p123456 <./2_user.sql
  del "2_user.sql"

echo Done!
