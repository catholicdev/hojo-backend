import { EntityRepository, Repository } from "typeorm";

import { Token } from "@user/database/entities";

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {}
