import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (ConfigService: ConfigService) => ({
        uri:
          ConfigService.get<string>('NODE_ENV') === 'test'
            ? ConfigService.get<string>('MONGODB_CONNECTION_TEST')
            : ConfigService.get<string>('MONGODB_CONNECTION'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [],
  exports: [],
})
export class DbModule {}
