import Cookies from "js-cookie";

// handleCookies encapsulates all cookie logic for application
export const handleCookies = (setPage, routes) => {
  const pageNumber = `page_number`;
  const maxPage = Object.keys(routes).length - 1;

  // Grab page number cookie value if present
  const cIndex = Cookies.get(pageNumber) ?? null;

  switch (true) {
    // If no cookie is found or page number is invalid due to switching routes, reset "page_number" to 0
    case cIndex === null:
    case parseInt(cIndex) > maxPage - 1:
      Cookies.set(pageNumber, 0);
      // Set initial page content
      setPage(routes[0]);
      break;
    default:
      // If page page number is present, increase by one
      var intIndex = parseInt(cIndex) + 1;
      // update cookie taking into account 0-based indexing
      intIndex === maxPage
        ? Cookies.remove(pageNumber) // if at max, remove cookie => resets page to routes[0]
        : Cookies.set(pageNumber, intIndex); // set new cookie value
      setPage(routes[intIndex]); // set content to next page
  }
};