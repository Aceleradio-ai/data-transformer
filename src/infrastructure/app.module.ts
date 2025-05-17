import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as providers from './providers';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: Object.values(providers),
})
export class AppModule {}
