import { Injectable } from '@nestjs/common';

import { SentenceRepository } from '@bible/database/repositories';

@Injectable()
export class SentenceService {
    constructor(
        private readonly sentenceRepository: SentenceRepository
    ) { }

    async getSentenceChapter (chapterId: string) {
        return this.sentenceRepository.find({
            select: [
                "sequence",
                "content"
            ],
            where: {
                chapterId
            }
        })
    }
}
