import gql from "graphql-tag";

const inAndOutFromC1 = gql`
    query inAndOutFromC1($c1: String!){
        migrations_in_out_aggregate(where: {c1: {_eq: $c1}}){
            nodes {
                c1
                c2
                in
                out
            }
        }
    }`;
const queryAllCountries = gql`
    {
        countries: migrations_in_out(distinct_on: c1) {
            code: c1
        }
    }`;

export {
    inAndOutFromC1,
    queryAllCountries
}
