import { Controller, Get } from '@nestjs/common';
import { ShopifyService } from './shopify.service';
import {
  GET_CUSTOMERS_QUERY,
  GET_ORDERS_QUERY,
  GET_PRODUCTS_QUERY,
} from 'src/graphql';

@Controller('shopify')
export class ShopifyController {
  constructor(private readonly shopifyService: ShopifyService) {}

  @Get('products')
  async getProducts() {
    return this.shopifyService.get({
      entity: 'products',
      query: GET_PRODUCTS_QUERY,
      variables: { first: 1 },
      extraFields: ['variants', 'media'],
    });
  }

  @Get('customers')
  async getCustomers() {
    return this.shopifyService.get({
      entity: 'customers',
      query: GET_CUSTOMERS_QUERY,
      variables: { first: 1 },
      extraFields: ['orders'],
    });
  }

  @Get('orders')
  async getOrders() {
    return this.shopifyService.get({
      entity: 'orders',
      query: GET_ORDERS_QUERY,
      variables: { first: 1 },
      extraFields: ['lineItems'],
    });
  }
}
