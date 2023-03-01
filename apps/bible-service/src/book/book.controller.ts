import { Body, Controller, Logger, Post } from "@nestjs/common";

import { BookService } from "@bible/book/book.service";

@Controller("book")
export class BookController {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly bookService: BookService) {}

  @Post("summary")
  async bookSummary(@Body() message) {
    this.logger.log(`summary: ${JSON.stringify(message)}`);
    const { bookId } = message;

    return this.bookService.getBookSummary(bookId);
  }
}
