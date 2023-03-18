import client from "../client";

const compositionService = client.service("compositions");

export async function deleteComposition(id: string) {
  const result = await compositionService.remove(id, {
    provider: "rest",
    headers: {
      authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },

    authenticated: true,
  });
  return result;
}

export async function createComposition(composition: string, language: string) {
  const result = await compositionService.create(
    {
      content: composition,
    },
    {
      provider: "rest",
      headers: {
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },

      authenticated: true,
    }
  );
  return result;
}

export async function getComposition(compositionId: string) {
  const composition = await compositionService.get(compositionId, {
    provider: "rest",
    headers: {
      authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    authenticated: true,
  });
  return composition;
}

export async function getCompositions() {
  const compositions = await compositionService.find({
    query: {
      $sort: { createdAt: -1 },
      $limit: 10,
    },
    provider: "rest",
    headers: {
      authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    authenticated: true,
  });

  return compositions;
}

export function correctComposition(composition: string, language: string) {
  compositionService.create({});
}
