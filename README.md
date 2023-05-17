# NFC Tag Experiment
---
- Our platform architect created a mini project using an nfc tag, taking you through the history of [<img alt="bitly" src="https://img.shields.io/badge/bitly-%2312100E.svg?&style=for-the-badge&logo=bitly&logoColor=red&color=172f41" />](https://bitly.com/)
- Every phone tap opened a new page, however, the same underlying url was being used

### OoOf
---
- My initial assumption was setting the route based on the device's user agent... which resulted in the unnecessary creation of a server. This server used redis storage to persist/increment count according to the browsers user agent. Returning an index which the client then use to display the correct page. 
- But this of course can all be accomplished through user cookies.
- So.. scrap server, implement cookies.

### Let's goo
---
- It was around this time, ideas started flowing...
- I bought a bunch of nfc tags and came up with the idea of sending them out to friends as a sort of "letter".
- But instead of paper and pen, it's interactive through a mobile device.
---

### CMS ftw
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
- Each route is dynamically created based on the entries recieved from this list
- To create a new 'letter,' you simply need to add an entry to the CMS. No additional coding is required 😎

