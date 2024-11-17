import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopifyModule } from './proxy/shopify/shopify.module';

@Module({
  imports: [ShopifyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
