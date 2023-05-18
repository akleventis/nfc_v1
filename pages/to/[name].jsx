import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { getContent } from "../../lib/contentful.jsx";
import { handleCookies } from "../../lib/cookies.jsx";
import Typewriter from "typewriter-effect";
import twemoji from "twemoji";

// allow for emojis across all devices
const convertTextToTwemoji = (text) => {
  return twemoji.parse(text, {
    folder: "svg",
    ext: ".svg",
  });
};

export async function getStaticProps(context) {
  const entries = getContent("entries")
  return {
    props: {
      entries: entries
    },
    revalidate: 60,
  }
}

// createRouteMapping builds index based component page routes map{index: <component/>}
export const createRouteMapping = (entries, person) => {
  let routes = {};
  entries.map((entry) => {
    if (entry.title === person) {
      entry.pages.forEach((page, i) => {
        const textBoxes = page.fields.text && page.fields.text;
        const imageURL = page.fields.image && page.fields.image.fields.file.url;
        routes[i] = (
          <Main
            key={i}
            textBoxes={textBoxes}
            imageURL={imageURL}
            person={person}
          />
        );
      });
    }
  });
  return routes;
};

// typewriter effect component
const Writer = ({ text }) => {
  const container = (
    <div className="write-container">
      <div>
        <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString(text).changeDelay(1).start();
          }}
          options={{
            delay: 40,
          }}
        />
      </div>
    </div>
  );
  return container;
};

// header
const Head = ({ person }) => {
  return (
    <Head>
      <title>Dear {person}</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="stylesheet"
        href="https://twemoji.maxcdn.com/v/latest/twemoji.css"
      />
    </Head>
  );
};

// main page content
const Main = ({ textBoxes, imageURL, person }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < textBoxes.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentIndex, textBoxes]);

  return (
    <>
      <Head person={person} />
      <section style={{ backgroundImage: `url(${imageURL})` }}>
        {textBoxes != undefined &&
          textBoxes.slice(0, currentIndex + 1).map((text, i) => {
            const convertedText = convertTextToTwemoji(text);
            return <Writer text={convertedText} index={i} key={i} />;
          })}
      </section>
    </>
  );
};

export default function Page() {
  const [page, setPage] = useState();
  const router = useRouter();
  let name = router.query && router.query.name ? router.query.name : "";

  // We'll be using the 'page_number' cookie value (int) as the key in
  // routes hash map to determine which page to display
  useEffect(() => {
    const render = async () => {
      try {
        // get entries from cms
        let entries = await getContent("entries");

        // create index based component map
        const routes = createRouteMapping(entries, name);

        // handle cookies accordingly
        handleCookies(setPage, routes, name);
      } catch (error) {
        console.log(error);
      }
    };
    if (router.query && router.query.name) {
      render();
    }
  }, [router.query]);

  return <div>{page}</div>;
}
