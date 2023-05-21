import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { getEntries, convertTextToTwemoji } from "../../lib/contentful.jsx";
import { handleCookies } from "../../lib/cookies.jsx";
import Typewriter from "typewriter-effect";

// createRouteMapping builds index based component page routes map{index: <component/>}
const createRouteMapping = (entries, person) => {
  let routes = {};
  entries.map((entry) => {
    if (entry.title === person) {
      entry.pages.forEach((page, i) => {
        const textBoxes = page.fields.text && page.fields.text;
        const imageURL = page.fields.image && page.fields.image.fields.file.url;
        routes[i] = (
          <Main
            key={i}
            index={i}
            maxIndex={entries.length-1}
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
  return (
    <div className="write-container">
      <Typewriter
        onInit={(typewriter) => {
          typewriter.typeString(text).changeDelay(1).start();
        }}
        options={{
          delay: 40,
        }}
      />
    </div>
  );
};

const Main = ({ textBoxes, imageURL, person, index, maxIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (textBoxes !== undefined && currentIndex < textBoxes.length - 1) {
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
        <p>{index+1}/{maxIndex+1}</p>
        {textBoxes != undefined &&
          textBoxes.slice(0, currentIndex + 1).map((text, i) => {
            return <Writer text={convertTextToTwemoji(text)} key={i} />;
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
        let entries = await getEntries(); // get entries from cms
        let routes = createRouteMapping(entries, name); // create index based component map
        name !== "" && handleCookies(setPage, routes, name); // handle cookies accordingly
      } catch (error) {
        console.log(error);
      }
    };
    render();
  }, [router.query]);

  return <div>{page}</div>;
}
