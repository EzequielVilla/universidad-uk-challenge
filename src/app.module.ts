import { Module } from '@nestjs/common';
import { ProductModule } from './resources/product/product.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './resources/db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DbModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
