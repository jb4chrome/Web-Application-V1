# Backend README

# Web App Project - Backend

This is the backend of the web application built using FastAPI. The backend serves as the API layer for the frontend application, handling requests and responses.

## Project Structure

- **app/**: Contains the main application code.
  - **main.py**: Entry point for the FastAPI application.
  - **routers/**: Contains API routers for different endpoints.
  - **models/**: Defines data models used in the application.
  - **schemas/**: Contains Pydantic schemas for data validation and serialization.
  - **utils/**: Utility functions used throughout the application.
  
## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd web-app-project/backend
   ```

2. Create a virtual environment (optional but recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

## Running the Application

To run the FastAPI application, execute the following command:
```
uvicorn app.main:app --reload
```

The application will be available at `http://127.0.0.1:8000`.

## API Documentation

The automatically generated API documentation can be accessed at:
- Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License. See the LICENSE file for details.