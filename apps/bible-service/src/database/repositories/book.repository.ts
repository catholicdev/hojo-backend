import { EntityRepository, Repository } from "typeorm";

import { Book } from "@bible/database/entities";

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {}
