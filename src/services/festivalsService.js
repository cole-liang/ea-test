import http from "./httpService";

const festivalsURL = "/festivals";

export async function getFestivals() {
  const { data: festivals } = await http.get(festivalsURL);
  return festivals;
}
