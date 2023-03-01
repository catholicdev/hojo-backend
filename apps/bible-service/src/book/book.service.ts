import { Injectable } from "@nestjs/common";

import { BookRepository } from "@bible/database/repositories";

@Injectable()
export class BookService {
  constructor(private readonly bookRepo: BookRepository) {}

  async getBookSummary(bookId: string): Promise<object> {
    const book = await this.bookRepo.findOne({ where: { id: bookId } });
    if (book) {
      return { bookSummary: book.summary };
    }

    return { bookSummary: "" };
  }
}
