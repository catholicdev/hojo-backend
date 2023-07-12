import { Body, Controller, Post } from "@nestjs/common";

import { BookService } from "@bible/book/book.service";

@Controller("book")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post("summary")
  async bookSummary(@Body() message) {
    const { bookId } = message;

    return this.bookService.getBookSummary(bookId);
  }
}
