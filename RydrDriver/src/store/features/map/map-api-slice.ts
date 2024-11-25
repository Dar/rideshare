import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const mapsApi = createApi({
  reducerPath: 'mapsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://maps.googleapis.com/maps/api/place/details/json',
  }),
  endpoints(builder) {
    return {
      fetchLocationData: builder.query({
        query: ({originPlaceId, destinationPlaceId}) => {
          return (
            `?place_id=${originPlaceId}&key=${process.env.GOOGLE_API_KEY}` +
            `&place_id=${destinationPlaceId}&key=${process.env.GOOGLE_API_KEY}`
          );
        },
      }),
    };
  },
});

export const {useFetchLocationDataQuery} = mapsApi;

// import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// const DOGS_API_KEY = 'cbfb51a2-84b6-4025-a3e2-ed8616edf311';

// interface Breed {
//   id: string;
//   name: string;
//   image: {
//     url: string;
//   };
// }

// export const mapsApiSLice = createApi({
//   reducerPath: 'mapsApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://api.thedogapi.com/v1',
//     prepareHeaders(headers) {
//       headers.set('x-api-key', DOGS_API_KEY);

//       return headers;
//     },
//   }),
//   endpoints(builder) {
//     return {
//       fetchBreeds: builder.query<Breed[], number | void>({
//         query(limit = 20) {
//           return `/breeds?limit=${limit}`;
//         },
//       }),
//     };
//   },
// });

// export const {useFetchBreedsQuery} = mapsApiSLice;
