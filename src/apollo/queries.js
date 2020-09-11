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
const queryDetails = gql`
    query queryDetails($c1: String!){
        all_migrations(where: {c1: {_eq: $c1}}){
            country: c1
            in: all_in
            out: all_out
        }
        series(where: {country: {_eq: $c1}}) {
            country
            value
            year
        }
        in_and_out: migrations_in_out(where: {c1: {_eq: $c1}}) {
            country: c2
            in
            out
        }
    }`;
const queryAllCountries = gql`
    {
        countries: country {
            area
            continent
            iso2
            iso3
            #            migrations: all_migrations {
            #                in: all_in
            #                out: all_out
            #                country:  c1
            #            }
            #            series {
            #                country
            #                value
            #                year
            #            }
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
    queryAllMigrations,
    queryDetails
}
