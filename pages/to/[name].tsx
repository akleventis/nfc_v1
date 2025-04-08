import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getEntries } from "../../utils/contentful";
import { createRouteMapping } from "../../utils/routeMapping.jsx";
import { handleCookies } from "../../utils/cookies.jsx";

export default function Page() {
  const router = useRouter();
  const [page, setPage] = useState();

  // extract route key as string https://palpens.netlify.app/to/{name}
  let name: string = router.query && router.query.name
    ? (Array.isArray(router.query.name) ? router.query.name[0] : router.query.name)
    : "";

  // leverage 'page_number' cookie value (int) as the key in routes mapping to determine which page to display.
  useEffect(() => {
    const render = async () => {
      try {
        // retrieve data from cms
        let entries = await getEntries();

        // create index-based component mapping: <Route/>[]
        let routes = createRouteMapping(entries, name);

        // set correct route for page render
        if (name !== "") {
          handleCookies(setPage, routes, name);
        }
      } catch (error) {
        console.error(error);
      }
    };
    render();
  }, [router.query]);

  return (
    <>
      <div className="lds-dual-ring"></div>
      <div> {page} </div>
    </>
  );
}