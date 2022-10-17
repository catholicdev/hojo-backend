import { Logger, Controller, Post } from "@nestjs/common";

import { DailyBibleService } from "@bible/daily-bible/daily-bible.service";

@Controller("daily")
export class DailyBibleController {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly dailyBibleService: DailyBibleService) {}

  @Post("bible")
  async bible() {
    this.logger.log(`start get bible`);

    return this.dailyBibleService.randomBibleSentence();
  }
}
