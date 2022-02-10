export default {
    metadata: {
        allowAdditionalProperties: true,
    },
    inputs: [
        {
            property: "name",
            "@type": "Text",
            required: true,
            multiple: false,
            group: "important",
        },
        {
            property: "description",
            "@type": "TextArea",
            multiple: false,
            group: "important",
        },
        { property: "alternativeHeadline", "@type": "Text", multiple: false },
        { property: "alternateName", "@type": "Text", multiple: false },
        { property: "keywords", "@type": "Text", multiple: false },
        { property: "license", "@type": "CreativeWork", multiple: false },
        { property: "dateCreated", "@type": "Date", multiple: false },
        { property: "dateModified", "@type": "Date", multiple: false },
        { property: "datePublished", "@type": "Date", multiple: false },
        { property: "author", "@type": ["Organization", "Person"] },
        { property: "creator", "@type": ["Organization", "Person"] },
        { property: "editor", "@type": "Person" },
        { property: "maintainer", "@type": ["Organization", "Person"] },
        { property: "publisher", "@type": ["Organization", "Person"] },
        { property: "funder", "@type": ["Organization", "Person"] },
        { property: "copyrightHolder", "@type": ["Organization", "Person"] },
        { property: "copyrightYear", "@type": "Date" },
        { property: "contentLocation", "@type": "Place" },
        { property: "locationCreated", "@type": "Place" },
    ],
};
