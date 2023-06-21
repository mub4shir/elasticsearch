import { Client } from "elasticsearch";

// Elasticsearch configuration
const elasticSearchConfig = {
  node: "http://localhost:9200", // Replace with your Elasticsearch node URL
};

// Initialize Elasticsearch client
const esClient = new Client(elasticSearchConfig);

// Create an index
async function createIndex(indexName: string): Promise<void> {
  try {
    const indexExists = await esClient.indices.exists({ index: indexName });
    if (!indexExists.body) {
      await esClient.indices.create({ index: indexName });
      console.log(`Index '${indexName}' created.`);
    } else {
      console.log(`Index '${indexName}' already exists.`);
    }
  } catch (error) {
    throw new Error(`Failed to create index '${indexName}': ${error.message}`);
  }
}

// Delete an index
async function deleteIndex(indexName: string): Promise<void> {
  try {
    const indexExists = await esClient.indices.exists({ index: indexName });
    if (indexExists.body) {
      await esClient.indices.delete({ index: indexName });
      console.log(`Index '${indexName}' deleted.`);
    } else {
      console.log(`Index '${indexName}' does not exist.`);
    }
  } catch (error) {
    throw new Error(`Failed to delete index '${indexName}': ${error.message}`);
  }
}

// Index a document
async function indexDocument(indexName: string, document: any): Promise<void> {
  try {
    await esClient.index({
      index: indexName,
      body: document,
    });
    console.log("Document indexed.");
  } catch (error) {
    throw new Error(`Failed to index document: ${error.message}`);
  }
}

// Search documents
async function searchDocuments(indexName: string, query: any): Promise<any[]> {
  try {
    const { body } = await esClient.search({
      index: indexName,
      body: query,
    });
    const hits = body.hits.hits;
    return hits.map((hit: any) => hit._source);
  } catch (error) {
    throw new Error(`Failed to search documents: ${error.message}`);
  }
}

// Delete a document
async function deleteDocument(indexName: string, id: string): Promise<void> {
  try {
    await esClient.delete({
      index: indexName,
      id: id,
    });
    console.log("Document deleted.");
  } catch (error) {
    throw new Error(`Failed to delete document: ${error.message}`);
  }
}

export {
  createIndex,
  deleteIndex,
  indexDocument,
  searchDocuments,
  deleteDocument,
};
