import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
 
@Injectable()
export class DataService {
    private subject = new Subject<any>();
 
    sendData(json: {}) {
        this.subject.next(json);
    }
 
    clearData() {
        this.subject.next(false);
    }
 
    getData(): Observable<any> {
        return this.subject.asObservable();
    }
}