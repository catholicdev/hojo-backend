# Dựng database chạy local

## Trường hợp 1: Chưa cài MySQL

Nếu chưa cài đặt MySQL trên máy, hãy vào thư mục `/docker/development` và chạy lệnh `docker-compose up` để khởi động MySQL bằng Docker.

Sau đó mở một cửa sổ terminal khác và chạy `./init_db.bat` (Windows) hoặc `./init_db.sh` (Mac) để chạy script dựng database.

## Trường hợp 2: Đã cài MySQL
Nếu bạn đã cài đặt MySQL trên máy tính, hãy sửa lại các file `init_db.sh` (Mac) hoặc `init_db.bat` (Windows):
- Xóa những cụm câu lệnh `docker exec -i development_mysql_1` đi (đừng commit lên remote). Sau đó câu lệnh sẽ trông như thế này:
```bat
call mysql --default-character-set=utf8mb4 -uroot -p123456 <./0_bible.sql
```

Sau đó chạy `./init_db.bat` (Windows) hoặc `./init_db.sh` (Mac) để chạy script dựng database.
