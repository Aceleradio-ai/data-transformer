import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CarDataGateway } from './adapters';
import * as providers from './providers';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: [...Object.values(providers), CarDataGateway],
})
export class AppModule {}
