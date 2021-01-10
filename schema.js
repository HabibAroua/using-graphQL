const axios = require('axios');


const
    {
        GraphQLObjectType,
        GraphQLObject,
        GraphQLInt,
        GraphQLString,
        GraphQLBoolean,
        GraphQLList,
        GraphQLSchema
    } = require('graphql');

// Launch type

const LaunchType = new GraphQLObjectType
(
    {
        name: 'Launch',
        fields: () =>
            (
                {
                    flight_number: {type: GraphQLInt},
                    mission_name: {type: GraphQLString},
                    launch_year: {type: GraphQLString},
                    launch_date_local: {type: GraphQLString},
                    launch_success: {type: GraphQLBoolean},
                    rocket: {type: RocketType}
                }
            )
    }
);

const RocketType = new GraphQLObjectType
(
    {
        name: 'Rocket',
        fields: ()=>
        (
            {
                id: {type: GraphQLInt},
                active: {type: GraphQLBoolean}
            }
        )
    }
)
//Root query  https://www.youtube.com/watch?v=SEMTj8w04Z8
const RootQuery = new GraphQLObjectType
(
    {
        name: 'RootQueryType',
        fields:
            {
                launches:
                {
                    type: new GraphQLList(LaunchType),
                    resolve(parent, args)
                    {
                        return axios
                            .get('https://api.spacexdata.com/v3/launches',
                                {
                                    headers:
                                        {
                                            'Content-Type': 'application/json'
                                        }
                                    }
                                )
                            .then(res=> res.data);
                    }
                },
                launch:
                    {
                        type: LaunchType,
                        args:
                            {
                                flight_number: {type: GraphQLInt}
                            },
                        resolve(parents, args)
                        {
                            return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                                .then(res => res.data);
                        }
                    },
                rockets:
                    {
                        type: new GraphQLList(RocketType),
                        resolve(parent, args)
                        {
                            return axios
                                .get('https://api.spacexdata.com/v3/rockets',
                                    {
                                        headers:
                                            {
                                                'Content-Type': 'application/json'
                                            }
                                    }
                                )
                                .then(res=> res.data);
                        }
                    },
                rocket:
                    {
                        type: RocketType,
                        args:
                            {
                                id: {type: GraphQLInt}
                            },
                        resolve(parents, args)
                        {
                            return axios.get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
                                .then(res => res.data);
                        }
                    }
            }
    }
);

module.exports = new GraphQLSchema
(
    {
        query: RootQuery
    }
)
