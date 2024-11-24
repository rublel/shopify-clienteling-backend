import { Body, Controller, Get, Post } from '@nestjs/common';
import { ShopifyService } from './shopify.service';
import {
  GET_CUSTOMERS_QUERY,
  GET_ORDERS_QUERY,
  GET_PRODUCTS_QUERY,
  GET_SHOPS_QUERY,
} from 'src/graphql';

@Controller('shopify')
export class ShopifyController {
  constructor(private readonly shopifyService: ShopifyService) {}

  @Post('/oauth/access_token')
  async getShopifyAccessToken(@Body() body: { code: string }) {
    return this.shopifyService.getAccessToken(body.code);
  }

  @Get('shops')
  async getShop() {
    return this.shopifyService.get({
      entity: 'shop',
      query: GET_SHOPS_QUERY,
      variables: { first: 10 },
    });
  }

  @Get('products')
  async getProducts() {
    return this.shopifyService.get({
      entity: 'products',
      query: GET_PRODUCTS_QUERY,
      variables: { first: 10 },
      extraFields: ['variants', 'media'],
    });
  }

  @Get('customers')
  async getCustomers() {
    return this.shopifyService.get({
      entity: 'customers',
      query: GET_CUSTOMERS_QUERY,
      variables: { first: 10 },
      extraFields: ['orders'],
    });
  }

  @Get('orders')
  async getOrders() {
    return this.shopifyService.get({
      entity: 'orders',
      query: GET_ORDERS_QUERY,
      variables: { first: 10 },
      extraFields: ['lineItems'],
    });
  }
}
