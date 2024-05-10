# Pydantic v1 vs Pydantic v2
# FastAPI is now compatible with both Pydantic v1 and Pydantic v2.

# Based on how new the version of FastAPI you are using, there could be small method name changes.



# The three biggest are:

# .dict() function is now renamed to .model_dump()

# schema_extra function within a Config class is now renamed to json_schema_extra

# Optional variables need a =None example: id: Optional[int] = None

from fastapi import FastAPI, Body
from pydantic import BaseModel, Field
from typing import Optional


app = FastAPI()


class Book:
    id: int
    title: str
    author: str
    description: str
    rating: int
    
    def __init__(self, id, title, author, description, rating):
        self.id = id
        self.title = title
        self.author = author
        self.description = description
        self.rating = rating
        

class BookRequest(BaseModel):
    id: Optional[int]
    title: str = Field(min_length=3)
    author: str
    description: str
    rating: int
    

Books = [
	Book(1, "Harry Potter", "J.K Rowling", "Fantasy", 5),
	Book(2, "Lord of the Rings", "J.R.R Tolkien", "Fantasy", 5),
    Book(3, "The Hobbit", "J.R.R Tolkien", "Fantasy", 5)
]


@app.get("/books")
async def get_books():
    return Books


@app.post("/create-book")
async def create_book(book_request: BookRequest):
    new_book = Book(**book_request.dict())
    Books.append(new_book)


@app.get("/books/{book_id}")
async def read_book(book_id: int):
    for book in Books:
        if book.id == book_id:
            return book


@app.put("/books/update_book")
async def update_book(book: BookRequest):
    for i in range(len(Books)):
        if Books[i].id == book.id:
            Books[i] = book
    
    
@app.delete("/books/{book_id}")
async def delete_book(book_id: int):
    for i in range(len(Books)):
        if Books[i].id == book_id:
            Books.pop(i)
            break