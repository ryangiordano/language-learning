import client from "../client";

const correctionService = client.service("corrections");

export async function getCorrectionsForCompositionId(compositionId: string) {
  const compositions = await correctionService.find({
    query: {
      $sort: { createdAt: 1 },
      $limit: 10,
      compositionId,
    },
    provider: "rest",
    headers: {
      authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    authenticated: true,
  });

  return compositions;
}
