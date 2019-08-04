import gql from "graphql-tag";

const inAndOutFromC1 = gql`{
    migrations_in_out_aggregate(where: {c1: {_eq: "US"}}){
        nodes {
            c1
            c2
            in
            out
        }
    }
}`;

export {
    inAndOutFromC1
}
