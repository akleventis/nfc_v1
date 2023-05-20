import Cookies from "js-cookie";

const removeCookies = (pCookieName, tsCookieName) => {
  Cookies.remove(pCookieName);
  Cookies.remove(tsCookieName);
};

const setCookies = (pCookie, page, tsCookie, timeStamp) => {
  Cookies.set(pCookie, page);
  Cookies.set(tsCookie, timeStamp);
};

// if either cookie is nil or > 10 min old, consider invalid
const isInvalid = (cTime, cIndex, currentTimestamp) => {
  return ( cTime === null || cIndex === null || parseInt(cTime) + 10 * 60 < currentTimestamp );
};

// handleCookies encapsulates all cookie logic for application
// logic can be condense, however, I fidn this very readable
export const handleCookies = (setPage, routes, name) => {
  const pCookie = `${name}_page_number`;
  const tsCookie = `${name}_time`;

  const maxPage = Object.keys(routes).length - 1;
  const currentTimestamp = Math.floor(Date.now() / 1000);

  const cIndex = Cookies.get(pCookie) ?? null;
  const cTime = Cookies.get(tsCookie) ?? null;

  if ( isInvalid(cTime, cIndex, currentTimestamp) ) {
    setCookies(pCookie, 0, tsCookie, currentTimestamp);
    setPage(routes[0]);
    return;
  }

  // incremenet index
  var newIndex = parseInt(cIndex) + 1;
  if (newIndex == maxPage) {
    removeCookies(pCookie, tsCookie);
    setPage(routes[newIndex]);
    return;
  }

  setCookies(pCookie, newIndex, tsCookie, currentTimestamp);
  setPage(routes[newIndex]);
};
