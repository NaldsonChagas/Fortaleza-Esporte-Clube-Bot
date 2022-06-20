import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TeamService } from './team.service';

@Module({
  providers: [TeamService],
  imports: [HttpModule],
  exports: [TeamService],
})
export class TeamModule {}
