import { Controller, Get, Logger } from "@nestjs/common";

import { DailyBibleService } from "@bible/daily-bible/daily-bible.service";

@Controller("daily")
export class DailyBibleController {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly dailyBibleService: DailyBibleService) {}

  @Get()
  async getDailyBible() {
    this.logger.log(`start get daily bible`);
    return this.dailyBibleService.randomBibleSentence();
  }
}
