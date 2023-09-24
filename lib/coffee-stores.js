import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_API_KEY,
});

const createFoursquareUrl = (latLong, query, limit) => {
  const baseUrl = "https://api.foursquare.com/v3/places/search";
  const params = new URLSearchParams({
    query,
    ll: latLong,
    limit,
  });
  return `${baseUrl}?${params.toString()}`;
};

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    perPage: 40,
  });

  return photos.response.results.map((result) => result.urls["small"]);
};

const fetchCoffeeStores = async (
  latLong = "49.2187677,16.5984049",
  limit = 6
) => {
  const photos = await getListOfCoffeeStorePhotos();

  const requestOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const foursquareUrl = createFoursquareUrl(latLong, "coffee", limit);
  const response = await fetch(foursquareUrl, requestOptions);
  const data = await response.json();

  return data.results.map((result, index) => ({
    id: result.fsq_id,
    name: result.name,
    address: result.location.address,
    neighborhood: result.location.locality,
    imgUrl: photos.length > 0 ? photos[index] : null,
  }));
};

export { getListOfCoffeeStorePhotos, fetchCoffeeStores };
