# NFC Tag Experiment
---
- Our platform architect created a mini project using an nfc tag, taking you through the history of [<img alt="bitly" src="https://img.shields.io/badge/bitly-%2312100E.svg?&style=for-the-badge&logo=bitly&logoColor=red&color=172f41" />](https://bitly.com/)
- Every phone tap opened a new page, however, the same underlying url was being used
    - live demo: https://palpens.netlify.app/to/name

### Let's goo
---
- It was around this time, ideas started flowing...
- I bought a bunch of nfc tags and came up with a concept of sending them out to friends as sort of "virtual letters".
- But instead of paper and pen, it's interactive through a mobile device.
- I'll be using browser cookies to determine which page the user is currently viewing.

### CMS 
---

- In order to generalize data population, I'll be using a headless CMS ([Contentful](https://contentful.com) 🙌🏻)
- Utilized Next.js's dynamic routing to build routes based on content fetched
- The CMS consists of an array of objects representing each person and their corresponding content. Here is an example JSON structure:

```json
[
    {
        "name": "person_1", // where "name" is used to generate each route (https://palpens.netlify.app/to/[name])
        "pages": [
            { "page1_content": "..."},
            { "page2_content": "..."},
            ...
        ]
    },
    {
        "name": "person_2",
        "pages": [
            { "page1_content": "..."},
            { "page2_content": "..."},
            ...
        ]
    }
]

```
- Each route is dynamically created based on the entries received from this list
    - {domain}/to/[slug]
- To create a new 'letter' I simply add an entry to the CMS. No additional coding required 😎

### NFC Tag
- URL is loaded onto the tag using [NFC Tools](https://apps.apple.com/us/app/nfc-tools/id1252962749)
  - example url: https://palpens.netlify.app/to/name (go ahead, give it a visit!)
- Upon each scan of the NFC tag, a new page is rendered based on browser cookies (see cookies.jsx)
- This essentially takes the user on an interactive journey through personalized content

### Contentful setup
---

1. create a contentful account and grab your [space id](https://www.contentful.com/help/find-space-id/)
2. `brew install contentful-cli`
3. `contentful login`
4. paste auth into terminal
5. `contentful space import --content-file models_export.json --space-id {space_id}`
 - This creates the content models for you
 - [slug] is the `Title` field in Pages model

### NFC tags
---

- deploy app (I use [netflify](https://www.netlify.com/ship-it-faster/?utm_source=google&utm_medium=paid_search&utm_campaign=20114569094&adgroup=149461691712&utm_term=netlify&utm_content=kwd-309804753741&creative=658110530851&device=c&matchtype=b&location=9028769&gad=1&gclid=CjwKCAjw36GjBhAkEiwAKwIWycfwz7JMD9cxfTxeqF7cyTs8Pl6HGpIB6mjZid5mgx0dw4kxPFXibBoCNeEQAvD_BwE) for small projects, highly recommend)... it's fre
- load nfc tag with `{domain}/to/[slug]` ei.` www.palpens.netlify.app/to/name`