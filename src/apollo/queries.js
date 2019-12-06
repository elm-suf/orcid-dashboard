import gql from "graphql-tag";

const inAndOutFromC1 = gql`
    query inAndOutFromC1($c1: String!){
        migrations_in_out_aggregate(order_by: {out: desc}, where: {c1: {_eq: $c1}}){
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
            area
            continent
            gdp
            internet_hosts
            internet_users
            iso2
            iso3
            languages
            name
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
const queryAllMigrations = gql`{
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
const querySeries = gql`{
    years: series(distinct_on: year, order_by: {year: asc}) {
        year
    }
    series(order_by: {year: asc} ) {
        country
        value
        year
    }
}`;

const queryLines = gql`{
    years: series(distinct_on: year) {
        year
    }
    series(where: {country: {_in: ["US", "IT", "GB", "SP", "FR", "CH"]}}
        order_by: {year: asc}) {
        country
        value
        year
    }
}`;


export {
    inAndOutFromC1,
    queryAllCountries,
    queryMigrations,
    queryGraph,
    querySeries,
    queryLines,
    queryAllMigrations
}
