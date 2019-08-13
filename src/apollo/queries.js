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
        countries: country(order_by: {iso2: asc}) {
            name
            code: iso2
            continent
        }
    }`;
const queryMigrations = gql`
    {
        migrations: migrations_in_out(where: {out: {_gte: "50"}}){
            from: c1
            to: c2
            value: out
        }
    }`;
const queryGraph = gql`
    {
        nodes: all_migrations{
            name: c1
            value: all_in
        }
        links: migrations_in_out {
            source: c1
            target: c2
        }
    }`;

export {
    inAndOutFromC1,
    queryAllCountries,
    queryMigrations,
    queryGraph
}
