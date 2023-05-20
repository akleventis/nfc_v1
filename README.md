# NFC Tag Experiment
---
- Our platform architect created a mini project using an nfc tag, taking you through the history of [<img alt="bitly" src="https://img.shields.io/badge/bitly-%2312100E.svg?&style=for-the-badge&logo=bitly&logoColor=red&color=172f41" />](https://bitly.com/)
- Every phone tap opened a new page, however, the same underlying url was being used

### OoOf
---
- My initial assumption was to set the route based on the clients user agent... which resulted in the unnecessary creation of a server. This server used redis storage to persist/increment count according to the browsers user agent. Returning an index which the client then use to display the correct page. 
- But this of course can all be accomplished through user cookies. 
- So.. scrap server, implement cookies.

### Let's goo
---
- It was around this time, ideas started flowing...
- I bought a bunch of nfc tags and came up with a concept of sending them out to friends as sort of "letters".
- But instead of paper and pen, it's interactive through a mobile device.

### CMS ftw
---

- In order to generalize data population, I'll be using a headless CMS ([Contentful](https://contentful.com) 🙌🏻)
- Next.js specializes in dynamic routing so everything went pretty smooth from here on out.
- The CMS consists of an array of objects representing each person and their corresponding content. Here is an example JSON structure:

```json
[
    {
        "title": "person_1",
        "pages": [
            { "page1_content": "..."},
            { "page2_content": "..."},
            ...
        ]
    },
    {
        "title": "person_2",
        "pages": [
            { "page1_content": "..."},
            { "page2_content": "..."},
            ...
        ]
    }
]

```
- Each route is dynamically created based on the entries received from this list
- To create a new 'letter,' simply add an entry to the CMS. No additional coding required 😎

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

- deploy app (I use [netflify](https://www.netlify.com/ship-it-faster/?utm_source=google&utm_medium=paid_search&utm_campaign=20114569094&adgroup=149461691712&utm_term=netlify&utm_content=kwd-309804753741&creative=658110530851&device=c&matchtype=b&location=9028769&gad=1&gclid=CjwKCAjw36GjBhAkEiwAKwIWycfwz7JMD9cxfTxeqF7cyTs8Pl6HGpIB6mjZid5mgx0dw4kxPFXibBoCNeEQAvD_BwE) for small projects, highly recommend)... it's free!
- load nfc tag with `{domain}/to/[slug]` ei.` www.nfc/to/tooper`