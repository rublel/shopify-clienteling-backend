import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as dotenv from 'dotenv';
import { lastValueFrom } from 'rxjs';

dotenv.config();

@Injectable()
export class ShopifyService {
  private readonly shopifyUrl = process.env.SHOPIFY_APP_URL;
  private readonly accessToken = process.env.SHOPIFY_DEMO_ACCESS_TOKEN;

  constructor(private httpService: HttpService) {}

  async getAccessToken(code: string, shop: string) {
    try {
      const response = this.httpService.post(
        `https://${shop}/admin/oauth/access_token`,
        {
          client_id: process.env.SHOPIFY_APP_CLIENT_ID,
          client_secret: process.env.SHOPIFY_APP_CLIENT_SECRET,
          code,
          scope:
            'write_products,write_customers,write_orders,read_products,read_customers,read_orders',
        },
      );
      const { data } = await lastValueFrom(response);
      return data;
    } catch (error) {
      console.error('Error fetching access token:', error);
      throw error;
    }
  }

  async get({ entity, query, variables, extraFields = [] }) {
    try {
      const response = this.httpService.post(
        this.shopifyUrl,
        {
          query,
          variables,
        },
        {
          headers: {
            'X-Shopify-Access-Token': this.accessToken,
          },
        },
      );
      const { data } = await lastValueFrom(response);
      return this.cleanGQLData(entity, data, { extraFields });
    } catch (error) {
      console.error(`Error fetching ${entity}:`, error);
      throw error;
    }
  }

  cleanGQLData(
    entity: string,
    data: any,
    { extraFields } = { extraFields: [] },
  ) {
    if (!data.data[entity]?.edges) return { record: data.data?.[entity] };
    function cleanEdges(nodeData) {
      if (Array.isArray(nodeData)) {
        return nodeData.map((item) => cleanEdges(item));
      }
      if (nodeData && nodeData.node) {
        return cleanEdges(nodeData.node);
      }
      return nodeData;
    }
    const records = cleanEdges(data.data[entity]?.edges).map((entity) => ({
      ...entity,
      ...extraFields.reduce((acc, field) => {
        acc[field] = cleanEdges(entity[field]?.edges);
        return acc;
      }, {}),
    }));
    const pageInfo = data.data[entity].pageInfo;
    const totalSize = records?.length;
    return {
      totalSize,
      records,
      pageInfo,
    };
  }
}
