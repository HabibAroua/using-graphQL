const
    {
        GraphQLObject,
        GraphQLInt,
        GraphQLString,
        GraphQLBoolean
    } = require('graphql');

// Launch type

const LaunchType = new GraphQLObject
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

const RocketType = new GraphQLObject
(
    {
        name: 'Rocket',
        fields: ()=>
        (
            {
                rocket_id: {type: GraphQLInt},
                rocket_name: {type: GraphQLString},
                rocket_type: {type: GraphQLString}
            }
        )
    }
)
//Root query  https://www.youtube.com/watch?v=SEMTj8w04Z8
