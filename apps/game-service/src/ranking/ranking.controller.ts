import { Controller, Post } from "@nestjs/common";

import { RankingService } from "./ranking.service";

@Controller('ranking')
export class RankingController {
    constructor(
        private readonly rankingService: RankingService
    ) {}

    @Post('get-top-three')
    async getTopThree() {
        return this.rankingService.getTopThree();
    }

}
