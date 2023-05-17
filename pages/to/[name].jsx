import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { getContent } from "../../lib/contentful.jsx";
import { handleCookies } from "../../lib/cookies.jsx";
import Typewriter from "typewriter-effect";

/**
  Two calls api calls are needed for render
  1. Define routes (getStaticPaths): Which creates the route, passing [name] to getStaticProps
  2. Fill content (getStaticProps): Receives [name] and generates data to pass to the page component as props
  Both called server-side (pre-render)
 */
export async function getStaticPaths() {
  let paths = await getContent("paths");
  return {
    paths: paths,
    fallback: "blocking",
  };
}

export async function getStaticProps() {
  let entries = await getContent("entries");
  return {
    props: { entries: entries },
  };
}

// createRouteMapping builds index based component page routes map{index: <component/>}
export const createRouteMapping = (entries, person) => {
  let routes = {};
  entries.map((entry) => {
    if (entry.title === person) {
      entry.pages.forEach((page, i) => {
        const textBoxes = page.fields.text;
        const imageURL = page.fields.image.fields.file.url;
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
      <Head>
        <title>Dear {person}</title>
      </Head>
      <section style={{ backgroundImage: `url(${imageURL})` }}>
        
        {textBoxes != undefined && textBoxes.slice(0, currentIndex + 1).map((text, i) => {
          return <Writer text={text} index={i} key={i} />;
        })}
      </section>
    </>
  );
};
export default function Page({ entries }) {
  const [page, setPage] = useState();
  const router = useRouter();
  let person = router.query.name;

  // We'll be using the 'page_number' cookie value (int) as the key in
  // routes hash map to determine which page to display
  useEffect(() => {
    const routes = createRouteMapping(entries, person);
    handleCookies(setPage, routes);
  }, []);

  return <div>{page}</div>;
}
