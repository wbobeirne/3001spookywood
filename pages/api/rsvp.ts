// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST supported" });
  }
  if (
    !req.body.name ||
    !req.body.email ||
    typeof req.body.numFriends !== "number"
  ) {
    return res
      .status(400)
      .json({ error: "Fields name, email, and numFriends required" });
  }
  try {
    const jwt = new google.auth.GoogleAuth({
      credentials: {
        client_id: process.env.GOOGLE_SHEETS_CLIENT_ID,
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: (process.env.GOOGLE_SHEETS_PRIVATE_KEY || "").replace(
          /\\n/g,
          "\n"
        ),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    console.log({ jwt });

    const sheets = google.sheets("v4");
    const sheetsRes = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SHEET_ID,
      range: "Sheet1!A:A",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      resource: {
        majorDimension: "ROWS",
        values: [[req.body.name, req.body.email, req.body.numFriends]],
      },
      auth: jwt,
    } as any);
    res.status(200).json(sheetsRes.data);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
