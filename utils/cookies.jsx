import Cookies from "js-cookie";

// handleCookies encapsulates all cookie logic for application and sets page state to specified route accordingly
export const handleCookies = (setPage, routes, name) => {
  const cookieIndexKey = `${name}_page_number`;
  const cookieTSKey = `${name}_time`;

  const lastIndex = Object.keys(routes).length - 1;
  const currentTimestamp = Math.floor(Date.now() / 1000);

  const cookieIndexValue = Cookies.get(cookieIndexKey) ?? null;
  const cookieTSValue = Cookies.get(cookieTSKey) ?? null; 

  if (isInvalid(cookieTSValue, cookieIndexValue, currentTimestamp)) {
    setCookies(cookieIndexKey, 0, cookieTSKey, currentTimestamp);
    setPage(routes[0]);
    return;
  }

  // increment index
  var newIndex = parseInt(cookieIndexValue) + 1;
  if (newIndex > lastIndex) {
    newIndex = 0;
    removeCookies(cookieIndexKey, cookieTSKey);
  }

  setCookies(cookieIndexKey, newIndex, cookieTSKey, currentTimestamp);
  setPage(routes[newIndex]);
};

const removeCookies = (cookieIndexKey, cookieTSKey) => {
  Cookies.remove(cookieIndexKey);
  Cookies.remove(cookieTSKey);
};

const setCookies = (cookieIndexKey, index, cookieTSKey, currentTimestamp) => {
  Cookies.set(cookieIndexKey, index);
  Cookies.set(cookieTSKey, currentTimestamp);
};


// isInvalid returns true if cookies are nil or stored timestamp is over 10 min old
const isInvalid = (cookieTSValue, cookieIndexValue, currentTimestamp) => {
  return (
    cookieTSValue === null ||
    cookieIndexValue === null ||
    parseInt(cookieTSValue) + 10 * 60 < currentTimestamp
  );
};
