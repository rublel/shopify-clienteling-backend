export const GET_CUSTOMERS_QUERY = /* GraphQL */ `
  query getCustomers($first: Int!) {
    customers(first: $first) {
      edges {
        node {
          id
          displayName
          email
          phone
          createdAt
          updatedAt
          orders(first: 5) {
            edges {
              node {
                id
                name
                createdAt
                lineItems(first: 5) {
                  edges {
                    node {
                      title
                      quantity
                    }
                  }
                }
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
    }
  }
`;
