export const GET_ORDERS_QUERY = `
query getOrders($first: Int!) {
  orders(first: $first) {
    edges {
      node {
        id
        name
        createdAt
        displayFulfillmentStatus
        displayFinancialStatus
        totalPriceSet {
          shopMoney {
            amount
          }
        }
        lineItems(first: 5) {
          edges {
            node {
              title
              name
              quantity
            }
          }
        }
        events(first: 10) {
          nodes {
              action
              appTitle
              createdAt
              criticalAlert
              message
          }
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}`;
