import feathers, { rest } from "@feathersjs/client";
import feathersAuthentication from "@feathersjs/authentication-client";
// TODO: Generate types from feathers
export type CorrectionModel = {
  originalContent: string;
  correctedContent: string;
  reason: string;
};

export type CompositionModel = {
  _id: string;
  content: string;
  userId: string;
  createdAt: number;
};

const client = feathers();
const serverEndpoint =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_ENDPOINT
    : process.env.REACT_APP_DEV_SERVER_ENDPOINT;
const restClient = rest(serverEndpoint);

client.configure(restClient.fetch(window.fetch.bind(window)));
client.configure(
  feathersAuthentication({
    storage: window.localStorage,
    storageKey: "authToken",
  })
);

export default client;
