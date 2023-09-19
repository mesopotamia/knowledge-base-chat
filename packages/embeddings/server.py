from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from langchain.vectorstores.pgvector import PGVector
from langchain.embeddings import HuggingFaceEmbeddings

model_name = "intfloat/e5-small-v2"
model_kwargs = {'device': 'cpu'}
encode_kwargs = {'normalize_embeddings': False}
hf = HuggingFaceEmbeddings(
    model_name=model_name,
    model_kwargs=model_kwargs,
    encode_kwargs=encode_kwargs
)
CONNECTION_STRING = "postgresql+psycopg2://postgres:password@localhost:5432/vector_db"
COLLECTION_NAME = "knowledge_base_vectors"
newDB = PGVector(connection_string=CONNECTION_STRING, collection_name=COLLECTION_NAME, embedding_function=hf)


app = FastAPI()
origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["Content-Type"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/query/{query}")
def read_item(query: str):
    return {"query": newDB.similarity_search_with_score(query, k=5)}
