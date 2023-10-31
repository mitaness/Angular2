import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, of, throwError } from 'rxjs';

@Component({
    template: `<button (click)="test4()" type="button" class="btn btn-primary">Send request</button>
  `
})
export class EventTestComponent {
    constructor(private http: HttpClient) { }

    test4() {
        var service = new SampleDataService(this.http)
        service
            .deleteBook(1)
            .subscribe({
                next: (x: void) => console.log('received 4', x),
                error: (err: any) => console.log('error me', err),
                complete: () => console.log('all done.')
            })
    }

    test3() {
        console.log('---')
        var headers = new HttpHeaders({
            'Accept': 'text/plain',
            'Authorization': 'token-1'
        })
        this.http.get<Book>('/api/course/', { headers: headers })
            .subscribe({
                next: (x: Book) => console.log('received 3', x),
                error: (err: any) => console.log('error me', err),
                complete: () => console.log('all done.')
            })
    }

    test2() {
        console.log('--- 1')
        this.http.post<Book>('/api/create', { id: 1, value: 3 })
            .subscribe({
                next: (x: Book) => console.log('received 2', x),
                error: (err: any) => console.log('error me', err)
            })
    }

    test() {
        console.log('1233')
        this.http.get<Book>('/api')
            .subscribe({
                next: (x: Book) => console.log('received 1', x),
                error: (err: any) => console.log('error', err)
            })
    }
}

interface Author {
    id: number
}

export interface Book {
    bookID: number;
    title: string;
    author: Author;
    publicationYear: number;
}

class SampleDataService {
    constructor(private http: HttpClient) { }

    addBook(newBook: Book) {
        return this.http.post<Book>('/api/book', newBook)
    }

    updateBook(book: Book) {
        return this.http.put<void>('/api/book/3', book)
    }

    deleteBook(id: number) {
        return this.http.delete<void>(`/api/books/${id}`)
            .pipe(catchError(this.handleError))
    }

    private handleError(err: HttpErrorResponse) {
        console.log('my', err)
        // return of()
        var customError = <BookTrackerError>{
            errorNumber: 1,
            message: err.message
        }
        // return throwError(customError)
        return throwError(() => customError)
    }
}

export interface BookTrackerError {
    errorNumber: number
    message: string
}


