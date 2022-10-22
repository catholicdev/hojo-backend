import { Injectable } from "@nestjs/common";

import * as dayjs from "dayjs";
import { AxiosInstance } from "axios";

import { bibleServiceConsumer } from "@util";

import { DailyBibleRepository } from "@user/database/repositories";

@Injectable()
export class UserBibleService {
  private readonly bibleServiceClient = bibleServiceConsumer() as AxiosInstance;

  constructor(private dailyBibleRepo: DailyBibleRepository) {}

  async dailyBible(userId: string) {
    const todayBible = await this.dailyBibleRepo.findByUserId(userId);

    if (todayBible && dayjs().isSame(dayjs(todayBible.receiveDate), "day")) {
      return {
        sentence: todayBible.sentence,
        sequence: todayBible.sequence,
        chapterSequence: todayBible.chapterSequence,
        bookAbbreviation: todayBible.bookAbbreviation,
      };
    }

    const dailyBible = (await this.bibleServiceClient.post("daily/bible")).data;

    const userDailyBible = this.dailyBibleRepo.create({
      userId,
      sentence: dailyBible?.content,
      sequence: dailyBible?.sequence,
      chapterSequence: dailyBible?.chapter?.sequence,
      bookAbbreviation: dailyBible?.chapter?.book?.abbreviation,
    });

    await this.dailyBibleRepo.insert(userDailyBible);

    return {
      sentence: userDailyBible.sentence,
      sequence: userDailyBible.sequence,
      chapterSequence: userDailyBible.chapterSequence,
      bookAbbreviation: userDailyBible.bookAbbreviation,
    };
  }
}
