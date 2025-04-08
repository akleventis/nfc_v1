# NFC Tag 'Virtual Letter' Experiment
---
I bought a bunch of NFC (near field communication) tags and came up with a concept of sending them out to friends as sort of "virtual letters." A re-scan of an NFC tag essentially acts as a 'page refresh'
> Update, this doesn't seem to be the case with firefox -> arrow buttons instead of refresh?

Routes are dynamically fetched from a CMS and created upon page load. Browser cookies are leveraged to determine which page a user is currently viewing

1. URL is loaded onto the tag using [NFC Tools](https://apps.apple.com/us/app/nfc-tools/id1252962749)
  - example url: https://palpens.netlify.app/to/name
2. Upon each scan of the NFC tag, a new page is rendered based on browser cookies; see [cookies.jsx](./utils/cookies.jsx)

This takes the user on an interactive journey through personalized content and allows for updates to be rolled out to individual routes on the fly. 

### Content Management System 
---
- This project uses [Contentful](https://contentful.com)
- Next.js's dynamic routing allows for runtime route creation based on content fetched.
- The CMS data consists of an array of objects representing each person and their corresponding content. Here is an example JSON structure:

```json
[
    {
        "name": "person_1", // where "name" is used as the slug (https://palpens.netlify.app/to/[name])
        "pages": [
            { "page1_content": "..."},
            { "page2_content": "..."},
            ...etc
        ]
    },
    {
        "name": "person_2",
        "pages": [
            { "page1_content": "..."},
            { "page2_content": "..."},
            ...etc
        ]
    }
]

```
- Each route is dynamically created based on the entries received from this list
    - `{domain}/to/[slug]`
- To create a new 'letter', simply add an entry to the CMS. No additional coding required

### Import Contentful content module's
1. create a contentful account and grab your [space id](https://www.contentful.com/help/find-space-id/)
2. `brew install contentful-cli`
3. `contentful login`
4. paste auth into terminal
5. `contentful space import --content-file lib/models_export.json --space-id {space_id}`
> see [lib/module_export.json](./lib/models_export.json)

This creates the content models for you; `[slug]` is the `Title` field in Pages model
