import { gql } from "apollo-boost";

export default gql`
    query {
        callTest{

            DN
            sbc
            product
            region
            cluster
            
        }
    }
`
