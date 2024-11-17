export const GET_PRODUCTS_QUERY = /* GraphQL */ `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          totalInventory
          priceRangeV2 {
            maxVariantPrice {
              amount
            }
            minVariantPrice {
              amount
            }
          }
          status
          handle
          description
          media(first: 5) {
            edges {
              node {
                preview {
                  image {
                    url
                  }
                }
              }
            }
          }
          variantsCount {
            count
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price
                position
                inventoryQuantity
                sku
                availableForSale
                displayName
                price
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
