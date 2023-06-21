import { searchDocuments } from "./elasticsearch";
// Usage examples

// Simple Text Search
const example1 = async () => {
  const index = "your_index_name";
  const query = {
    query: {
      match: {
        text: "search keywords",
      },
    },
  };
  const results = await searchDocuments(index, query);
  console.log("Example 1:", results);
};

// Term Search
const example2 = async () => {
  const index = "your_index_name";
  const query = {
    query: {
      term: {
        field: "value",
      },
    },
  };
  const results = await searchDocuments(index, query);
  console.log("Example 2:", results);
};

// Filtered Search
const example3 = async () => {
  const index = "your_index_name";
  const query = {
    query: {
      bool: {
        must: [
          {
            match: {
              field1: "value1",
            },
          },
          {
            match: {
              field2: "value2",
            },
          },
        ],
        filter: {
          range: {
            date: {
              gte: "2022-01-01",
            },
          },
        },
      },
    },
  };
  const results = await searchDocuments(index, query);
  console.log("Example 3:", results);
};

// Pagination and Sorting
const example4 = async () => {
  const index = "your_index_name";
  const query = {
    query: {
      match_all: {},
    },
    from: 0,
    size: 10,
    sort: [{ field1: "asc" }, { field2: "desc" }],
  };
  const results = await searchDocuments(index, query);
  console.log("Example 4:", results);
};

// Aggregations
const example5 = async () => {
  const index = "your_index_name";
  const query = {
    size: 0,
    aggs: {
      category_stats: {
        terms: {
          field: "category",
        },
      },
    },
  };
  const results = await searchDocuments(index, query);
  console.log("Example 5:", results);
};

// Highlighting
const example6 = async () => {
  const index = "your_index_name";
  const query = {
    query: {
      match: {
        text: "search keywords",
      },
    },
    highlight: {
      fields: {
        text: {},
      },
    },
  };
  const results = await searchDocuments(index, query);
  console.log("Example 6:", results);
};

// Multi-match Search
const example7 = async () => {
  const index = "your_index_name";
  const query = {
    query: {
      multi_match: {
        query: "search keywords",
        fields: ["title", "description"],
      },
    },
  };
  const results = await searchDocuments(index, query);
  console.log("Example 7:", results);
};

// Run the examples
example1();
example2();
example3();
example4();
example5();
example6();
example7();
