type SearchField = {
  field: string;
  value: string;
};

function generateMatchQuery(field: string, value: string): any {
  return {
    match: {
      [field]: value,
    },
  };
}

function generateTermQuery(field: string, value: string): any {
  return {
    term: {
      [field]: value,
    },
  };
}

function generateHighlightOptions(fields: string[]): any {
  return {
    fields: fields.reduce((obj: any, field: string) => {
      obj[field] = {};
      return obj;
    }, {}),
  };
}

async function executeQuery(
  index: string,
  query: any,
  highlightFields?: string[]
): Promise<any[]> {
  const searchQuery: SearchQuery = {
    index,
    query,
    ...(highlightFields && {
      highlight: generateHighlightOptions(highlightFields),
    }),
  };

  return searchDocuments([searchQuery]);
}

// Example usage
async function runQueryGenerator() {
  try {
    const matchQuery = generateMatchQuery("title", "Elasticsearch");
    const termQuery = generateTermQuery("category", "Technology");
    const highlightFields = ["content"];

    const results = await executeQuery(
      "index",
      [matchQuery, termQuery],
      highlightFields
    );
    console.log(results);
  } catch (error) {
    console.error(error);
  }
}

runQueryGenerator();

import { searchDocuments } from "./elasticsearch"; // Replace with the correct import path for your Elasticsearch code

type SearchField = {
  field: string;
  value: string;
};

function generateMatchQuery(field: string, value: string): any {
  return {
    match: {
      [field]: value,
    },
  };
}

async function executeMultiSearch(
  index: string,
  searchFields: SearchField[]
): Promise<any[]> {
  const queries = searchFields.map((searchField) => {
    return {
      index,
      body: generateMatchQuery(searchField.field, searchField.value),
    };
  });

  const { body } = await searchDocuments({
    index: "_msearch",
    body: queries,
  });

  const results = body.responses.map((response: any) =>
    response.hits.hits.map((hit: any) => hit._source)
  );
  return results.flat();
}

// Example usage
async function runMultiSearch() {
  try {
    const index = "your_index_name";
    const searchFields: SearchField[] = [
      { field: "title", value: "Elasticsearch" },
      { field: "category", value: "Technology" },
    ];

    const results = await executeMultiSearch(index, searchFields);
    console.log(results);
  } catch (error) {
    console.error(error);
  }
}

runMultiSearch();
const query = {
  query: {
    match: {
      title: "Elasticsearch",
    },
  },
};

const searchResults = await searchDocuments("my-index", query);
console.log(searchResults);

const query = {
  query: {
    match: {
      content: "Elasticsearch",
    },
  },
  highlight: {
    fields: {
      content: {},
    },
  },
};

const searchResults = await searchDocuments("my-index", query);
console.log(searchResults);

const query = {
  query: {
    bool: {
      must: [
        {
          match: {
            title: "Elasticsearch",
          },
        },
      ],
      filter: [
        {
          term: {
            category: "Technology",
          },
        },
      ],
    },
  },
};

const searchResults = await searchDocuments("my-index", query);
console.log(searchResults);
