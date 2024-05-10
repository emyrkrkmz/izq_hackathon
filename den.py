from fastapi import FastAPI, Body

app = FastAPI()


Books = [
    {"id": 1, "title": "Book 1", "author": "Author 1", "category" : "fiction"},
    {"id": 2, "title": "Book 2", "author": "Author 2", "category" : "romence"},
    {"id": 3, "title": "Book 3", "author": "Author 3", "category" : "fiction"},
    {"id": 4, "title": "Book 4", "author": "Author 4", "category" : "fiction"},
    {"id": 5, "title": "Book 5", "author": "Author 5", "category" : "romance"},
]


@app.get("/books")
async def firstapi():
    return Books


@app.get("/books/{book_title}")
async def readbook(book_title: str):
    for book in Books:
        if book.get("title").casefold() == book_title.casefold():
            return book


@app.get("/books/")
async def read_category_by_query(category: str):
    books_to_return = []
    for book in Books:
        if book.get("category").casefold() == category.casefold():
            books_to_return.append(book)
    return books_to_return


@app.get("/books/{book_author}/")
async def read_author_by_query(book_author: str, category: str):
    books_to_return = []
    for book in Books:
        if book.get("author").casefold() == book_author.casefold() and book.get("category").casefold() == category.casefold():
            books_to_return.append(book)

            
    return books_to_return



@app.post("/books/create_book")
async def create_book(new_book=Body()):
    Books.append(new_book)
    
    
@app.put("/books/update_book")
async def update_book(updated_book=Body()):
    for i in range(len(Books)):
        if Books[i].get("title").casefold() == updated_book.get('title').casefold():
            Books[i] = updated_book


@app.delete("/books/delete_book/{book_title}")
async def delete_book(book_title: str):
    for i in range(len(Books)):
        if Books[i].get("title").casefold() == book_title.casefold():
            Books.pop(i)
            break