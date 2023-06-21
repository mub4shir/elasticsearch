# Elasticsearch Operations

This code snippet demonstrates basic Elasticsearch operations using the `@elastic/elasticsearch` package. It covers the following operations:

- Create an index
- Delete an index
- Index a document
- Search documents
- Delete a document

## Prerequisites

Before running the code, make sure you have the following:

- Elasticsearch instance running. Update the Elasticsearch node URL in the code (`elasticSearchConfig.node`) to match your Elasticsearch node URL.

## Installation

1. Clone the repository.

```bash
git clone https://github.com/mub4shir/elasticsearch.git
cd elasticsearch
```

2. Install the dependencies.

```bash
npm install
```

## Usage

To use the Elasticsearch operations, follow these steps:

1. Import the required functions into your script.

```bash
import {
  createIndex,
  deleteIndex,
  indexDocument,
  searchDocuments,
  deleteDocument,
} from "./elasticsearch";

// Replace "./elasticsearch" with the path to the Elasticsearch module in your project.


```

2. Initialize the Elasticsearch client.

```bash
const elasticSearchConfig = {
  node: "http://localhost:9200", // Replace with your Elasticsearch node URL
};

const esClient = new Client(elasticSearchConfig);

```

3. Call the desired functions as needed.

```bash
// Example: Create an index
await createIndex("your_index_name");

// Example: Index a document
const document = { id: 1, title: "Example Document" };
await indexDocument("your_index_name", document);

// Example: Search documents
const query = { query: { match_all: {} } };
const results = await searchDocuments("your_index_name", query);
console.log(results);

// Example: Delete a document
await deleteDocument("your_index_name", "1");

// Example: Delete an index
await deleteIndex("your_index_name");

```

4. Replace "your_index_name" with the actual index name you want to work with.

# License

This code is open source and available under the MIT License.
