import { Controller, Get, Post } from '@nestjs/common';

@Controller('pair-quiz-game/pairs')
export class QuizGame {
  @Get(':id')
  async getGameById() {}

  @Get('my-current')
  async getCurrentGame() {}

  @Post('connection')
  async connectToGame() {}

  @Post('my-current/answers')
  async applyAnswers() {}
}
