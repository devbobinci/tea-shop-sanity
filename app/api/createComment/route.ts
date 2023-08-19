import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { postId, name, email, comment } = await req.json();

  const mutations = {
    mutations: [
      {
        create: {
          _type: "comment",
          comment: comment,
          name: name,
          email: email,
          post: {
            _type: "reference",
            _ref: postId,
          },
        },
      },
    ],
  };

  const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-04-22/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;

  try {
    const result = await fetch(apiEndpoint, {
      method: "POST",
      body: JSON.stringify(mutations),
      headers: {
        Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const json = await result.json();

    return NextResponse.json({ json });
  } catch (error) {
    console.log(error);
    throw new Error("Could not create a comment");
  }
}
