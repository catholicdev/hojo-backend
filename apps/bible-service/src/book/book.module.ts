import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BookService } from "@bible/book/book.service";
import { BookController } from "@bible/book/book.controller";

import { Book } from "@bible/database/entities";
import { BookRepository } from "@bible/database/repositories";

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookRepository])],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
