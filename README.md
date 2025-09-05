# ⚖️ Legal Document Assistant

A RAG (Retrieval-Augmented Generation) application that helps you understand legal terms and answer questions based on your legal documents.

## 🚀 Features

- **Term Definitions**: Get clear explanations of legal terms found in your documents
- **Document Q&A**: Ask questions about specific clauses, obligations, or concepts
- **Document Summaries**: Request summaries of particular aspects or sections
- **Source Citations**: See exactly which parts of your documents support each answer
- **Multi-format Support**: Works with PDF and text documents

## 🛠️ Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Set up Environment Variables

Create a `.env` file in the project root:

```bash
OPENAI_API_KEY=your_actual_openai_api_key_here
```

**Important**: Never commit your actual API key to version control!

### 3. Prepare Your Documents

Place your legal documents (PDF or text files) in the `data/` directory.

### 4. Ingest Documents

Run the ingestion script to process your documents:

```bash
python ingest.py data/your_document.pdf
```

Or for multiple documents:
```bash
python ingest.py data/
```

### 5. Run the Application

```bash
streamlit run app.py
```

## 📖 Usage

### Query Types

1. **General Question**: Ask any legal question about your documents
2. **Term Definition**: Get definitions of specific legal terms
3. **Document Summary**: Request summaries of particular aspects

### Example Questions

- "What is force majeure?"
- "What are the key obligations in this contract?"
- "Summarize the main clauses"
- "Who are the parties involved?"
- "What are the important dates?"

## 🏗️ Architecture

- **Document Loading**: Supports PDF and text files
- **Text Splitting**: Chunks documents into manageable pieces
- **Embeddings**: Uses multilingual sentence transformers
- **Vector Storage**: FAISS for efficient similarity search
- **RAG Chain**: Combines retrieval with OpenAI's language model
- **Web Interface**: Streamlit for easy interaction

## 📁 Project Structure

```
legalview/
├── app.py                 # Main Streamlit application
├── config.py             # Configuration settings
├── ingest.py             # Document ingestion script
├── modules/              # Core functionality modules
│   ├── embeddings.py     # Embedding generation
│   ├── loader.py         # Document loading
│   ├── rag_chain.py      # RAG pipeline
│   ├── retriever.py      # Document retrieval
│   └── splitter.py       # Text splitting
├── data/                 # Document storage
├── vectorstore/          # FAISS vector database
└── requirements.txt      # Python dependencies
```

## 🔧 Configuration

Key settings in `config.py`:

- `EMBEDDING_MODEL`: Sentence transformer model for embeddings
- `LLM_MODEL`: OpenAI model for generating answers
- `VECTORSTORE_PATH`: Path to store vector embeddings

## 🧪 Testing

Run tests to ensure everything works correctly:

```bash
python -m pytest tests/
```

## 🚨 Security Notes

- Never commit API keys to version control
- Use environment variables for sensitive information
- The application only processes documents you explicitly upload

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is for educational and personal use. Please ensure you have the right to process any documents you upload.

