from langchain_community.vectorstores import FAISS
from modules.embeddings import get_embeddings
from config import VECTORSTORE_PATH

def get_vectorstore():
    embeddings = get_embeddings()
    return FAISS.load_local(VECTORSTORE_PATH, embeddings, allow_dangerous_deserialization=True)

def get_retriever():
    vectorstore = get_vectorstore()
    return vectorstore.as_retriever(search_kwargs={"k": 3})
