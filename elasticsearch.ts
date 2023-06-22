import { Client } from "@elastic/elasticsearch";
// Elasticsearch client configuration
const elasticSearchConfig = {
  node: "http://localhost:9200", // Elasticsearch node URL
};

// Elasticsearch client initialization
const esClient = new Client(elasticSearchConfig);

type Document<T> = {
  index: string;
  body: T;
};

// Function to create an Elasticsearch index
export async function createIndex(indexName: string): Promise<void> {
  const params = {
    index: indexName,
  };

  try {
    const indexExists = await esClient.indices.exists(params);
    console.log("indexExists", indexExists);
    if (!indexExists) {
      await esClient.indices.create(params);
      console.log(`Index '${indexName}' created successfully.`);
    } else {
      console.log(`Index '${indexName}' already exists.`);
    }
  } catch (error) {
    console.error(`Error creating index '${indexName}':`, error);
    throw error;
  }
}

// Function to delete an Elasticsearch index
export async function deleteIndex(indexName: string): Promise<void> {
  const params = {
    index: indexName,
  };

  try {
    const indexExists = await esClient.indices.exists(params);
    if (indexExists) {
      await esClient.indices.delete(params);
      console.log(`Index '${indexName}' deleted successfully.`);
    } else {
      console.log(`Index '${indexName}' does not exist.`);
    }
  } catch (error) {
    console.error(`Error deleting index '${indexName}':`, error);
    throw error;
  }
}

// Function to index a document in Elasticsearch
export async function indexDocument<T>(document: Document<T>): Promise<void> {
  const params = {
    index: document.index,
    body: document.body,
  };

  try {
    await esClient.index(params);
    console.log(`Document indexed successfully.`);
  } catch (error) {
    console.error(`Error indexing document:`, error);
    throw error;
  }
}

// Function to search documents in Elasticsearch
export async function searchDocuments<T>(
  indexName: string,
  query: any
): Promise<any[]> {
  const params = {
    index: indexName,
    body: query,
  };

  try {
    const body = await esClient.search(params);

    return body.hits.hits.map((hit: any) => hit._source);
  } catch (error) {
    console.error(`Error searching documents:`, error);
    throw error;
  }
}

// Function to delete a document from Elasticsearch
export async function deleteDocument(
  indexName: string,
  documentId: string
): Promise<void> {
  const params = {
    index: indexName,
    body: {
      query: {
        match: {
          id: documentId,
        },
      },
    },
  };

  try {
    const body = await esClient.deleteByQuery(params);
    console.log("body", body);

    console.log(`Document deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting document:`, error);
    throw error;
  }
}
