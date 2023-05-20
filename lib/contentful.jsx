import { createClient } from "contentful";
import twemoji from "twemoji";

const contentTypeID = "pages";
const spaceID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const apiKey = process.env.NEXT_PUBLIC_CONTENTFUL_TOKEN;

const client = createClient({
  accessToken: apiKey,
  space: spaceID,
});

export const getEntries = async () => {
  let entries = [];
  try {
    const content = await client.getEntries({
      content_type: contentTypeID,
    });

    content.items.map((e) => {
      entries.push(e.fields);
    });
  } catch (err) {
    return err;
  }

  return entries;
};

// allow for emojis across all devices
export const convertTextToTwemoji = (text) => {
  return twemoji.parse(text, {
    folder: "svg",
    ext: ".svg",
  });
};