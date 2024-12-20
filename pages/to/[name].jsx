import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { getEntries } from "../../lib/contentful.jsx";
import { handleCookies } from "../../lib/cookies.jsx";
import Typewriter from "typewriter-effect";

// createRouteMapping builds index based component page routes array[index: <component/>]
const createRouteMapping = (entries, person) => {
  let routes = [];
  entries.map((entry) => {
    if (entry.title === person) {
      let totalPages = entry.pages.length;
      entry.pages.forEach((page, i) => {
        const textBoxes = page.fields.text && page.fields.text;
        const imageURL = page.fields.image && page.fields.image.fields.file.url;
        routes[i] = (
          <Main
            key={i}
            index={i}
            totalPages={totalPages}
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
          typewriter.typeString(text).start();
        }}
        options={{
          delay: 40,
        }}
      />
    </div>
  );
};
const ImageLoader = ({ src, children, onImageLoad }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      setImageLoaded(true);
      onImageLoad()
    };
  }, [src]);

  if (!imageLoaded) {
    return null;
  }

  return <div>{children}</div>;
};

const Main = ({ textBoxes, imageURL, person, index, totalPages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false)

  const handleImageLoad = () => {
    setIsLoaded(true)
  }

  useEffect(() => {
    // we don't want to start timout until background image has loaded
    // passing callback to child component to trigger state change upon load
    if (isLoaded){      
      const timer = setTimeout(() => {
        if (textBoxes !== undefined && currentIndex < textBoxes.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [currentIndex, textBoxes, isLoaded]);

  return (
    <>
      <Head>
        <title>Dear {person}</title>
      </Head>
      <ImageLoader src={imageURL} onImageLoad={handleImageLoad}>
        <section style={{ backgroundImage: `url(${imageURL})` }}>
          <div>
            <p>
              {index + 1}/{totalPages}
            </p>
          </div>
          {textBoxes != undefined &&
            textBoxes.slice(0, currentIndex + 1).map((text, i) => {
              return <Writer text={text} key={i} />;
            })}
        </section>
      </ImageLoader>
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

  return (
    <>
      {/* loading screen */}
      <div className="lds-dual-ring"></div>
      {/* content */}
      <div>{page}</div>
    </>
  )
}
