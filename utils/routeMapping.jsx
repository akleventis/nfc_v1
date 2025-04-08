import { Route } from "../components/Route";

export const createRouteMapping = (entries, person) => {
    let routes = [];
    entries.map((entry) => {
      if (entry.title === person) {
        let totalPages = entry.pages.length;
        entry.pages.forEach((page, i) => {
          const textBoxes = page.fields.text && page.fields.text;
          const imageURL = page.fields.image && page.fields.image.fields.file.url;
          routes[i] = (
            <Route
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