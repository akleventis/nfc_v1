import { createClient } from "contentful";

// createContentfulClient instantiates our client to interact with the Contentfulexp api
const createContentfulClient = () => {
  const spaceID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const apiKey = process.env.NEXT_PUBLIC_CONTENTFUL_TOKEN;

  const client = createClient({
    accessToken: apiKey,
    space: spaceID, 
  });
  return client;
};

// getContent reaches out to our headless cms filling in desired content
// specified by 'mapTo' (ex: 'paths', 'entries' for getStaticPaths() and getStaticProps() respectively)
export const getContent = async(mapTo) => {
const client = createContentfulClient();
  const contentTypeID = "pages";
  let res = [];
  try {
    const content = await client.getEntries({
      content_type: contentTypeID,
    });

    content.items.map((e) => {
      switch (mapTo) {
        case "paths":
          res.push({ params: { name: e.fields.title } });
          break;
        case "entries":
          res.push(e.fields);
      }
    });
  } catch (err) {
    return err;
  }
  return res;
}