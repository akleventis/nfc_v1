import { createClient } from "contentful";

// Define your entry structure
export interface LetterEntry {
  title: string;
  pages: {
    fields: {
      text?: string[];
      image?: {
        fields: {
          file: {
            url: string;
          };
        };
      };
    };
  }[];
}

const contentTypeID = "pages";
const spaceID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const apiKey = process.env.NEXT_PUBLIC_CONTENTFUL_TOKEN;

const client = createClient({
  accessToken: apiKey,
  space: spaceID,
});

export const getEntries = async (): Promise<LetterEntry[]> => {
  try {
    const content = await client.getEntries({
      content_type: contentTypeID,
    });
    
    return content.items.map(item => {
      return {
        title: item.fields.title,
        pages: item.fields.pages
      } as LetterEntry;
    });
  } catch (err) {
    console.error("Error fetching entries: ", err);
    return [];
  }
};