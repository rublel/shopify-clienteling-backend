import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as dotenv from 'dotenv';
import { lastValueFrom } from 'rxjs';

dotenv.config();

@Injectable()
export class ShopifyService {
  private readonly shopifyUrl = process.env.SHOPIFY_DEMO_HOST_URL;
  private readonly accessToken = process.env.SHOPIFY_DEMO_ACCESS_TOKEN;

  constructor(private httpService: HttpService) {}

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
    function cleanEdges(nodeData) {
      if (Array.isArray(nodeData)) {
        return nodeData.map((item) => cleanEdges(item));
      }
      if (nodeData && nodeData.node) {
        return cleanEdges(nodeData.node);
      }
      return nodeData;
    }
    const records = cleanEdges(data.data[entity].edges).map((entity) => ({
      ...entity,
      ...extraFields.reduce((acc, field) => {
        acc[field] = cleanEdges(entity[field]?.edges);
        return acc;
      }, {}),
    }));
    const pageInfo = data.data[entity].pageInfo;
    return { records, pageInfo };
  }
}
