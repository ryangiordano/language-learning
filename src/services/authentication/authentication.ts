import client from "../client";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const result = await client.authenticate({
      strategy: "local",
      email,
      password,
      expiresIn: "24h",
    });
    console.log(result);
  } catch (e) {
    console.error("Authentication error:", e);
  }
}
