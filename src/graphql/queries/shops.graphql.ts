export const GET_SHOPS_QUERY = /* GraphQL */ `
  query {
    shop {
      id
      name
      email
      description
      url
      contactEmail
      billingAddress {
        address1
        address2
        city
        company
        country
        countryCode
        firstName
        lastName
        latitude
        longitude
        name
        phone
        province
        provinceCode
        zip
      }
    }
  }
`;
