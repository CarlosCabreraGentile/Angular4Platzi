import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators'
// import { HelperService } from './helper.service';
//import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class ApiService {

	private baseUrl: string;

	constructor(private http: Http) {
		this.baseUrl = environment.API_ENDPOINT;
    }
    
    getHttpHeaders(uploadFile: boolean = false) {
        const headers = new Headers();

        if (!uploadFile) {
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json');
        }

        else {
            // headers.append('enctype', 'multipart/form-data');
        }

        // Send token
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            headers.append('Authorization', authToken);
        }

        return headers;
    }

 
	/**
	 * HTTP Get
	 * @param res
	 * @returns {Observable<R>}
	 */
	httpGet(res: string) {

        // Add timestamp to avoid cache
        if (res.indexOf('?') >= 0) {
            res += '&'
        }
        else {
            res += '?'
        }
        const timestamp = + new Date();
        res += '_t=' + timestamp;

		return this.http.get(this.baseUrl + res) //, { headers: this.getHttpHeaders() })
            .pipe(map((response: any) => response.json()))
            .pipe(catchError(this.handleError));
        }

	/**
	 * HTTP Post
	 * @param res
	 * @param dataPost
	 * @returns {Observable<R>}
	 */
	httpPost(res, dataPost, uploadFile = false): Observable<any> {
		let json = null;
		if (dataPost) {
			json = JSON.stringify(dataPost);
		}

		return this.http.post(this.baseUrl + res, json) //, { headers: this.getHttpHeaders() })
            .pipe(map((response: any) => response.json()))
            .pipe(catchError(this.handleError));
	}


	/**
	 * HTTP Post file
	 * @param res
	 * @param file
	 */
	httpPostFile(res, file: File): Observable<any> {

		const subject = new Subject<any>();

		const formData: FormData = new FormData();
		formData.append('file', file, file.name);


		// let options = new RequestOptions({ headers: headers });
		this.http.post(this.baseUrl + res, formData) //, { headers: this.getHttpHeaders(true) })
            .pipe(map((response: any) => response.json()))
			.pipe(catchError(this.handleError))
			.subscribe(
				data => subject.next(data),
				error => subject.error(error),
				() => subject.complete()
			);

		return subject.asObservable();
	}


	/**
	 * HTTP Put
	 * @param res
	 * @param dataPost
	 * @param localApi
	 * @returns {Observable<R>}
	 */
	httpPut(res, dataPost, mockapi: boolean = false): Observable<any> {
		const json = JSON.stringify(dataPost);
		return this.http.put(this.baseUrl + res, json) //, { headers: this.getHttpHeaders() })
            .pipe(map((response: any) => response.json()))
            .pipe(catchError(this.handleError));
	}


	/**
	 * HTTP Delete
	 * @param res
	 * @param attempts
	 * @returns {Observable<R>}
	 */
	httpDelete(res, mockapi: boolean = false): Observable<any> {
		return this.http.delete(this.baseUrl + res) //, { headers: this.getHttpHeaders() })
            .pipe(map((response: any) => response.json()))
            .pipe(catchError(this.handleError));
	}


	/**
	 * Handle error
	 * @param error
	 * @returns {any}
	 */
	private handleError(error: any) {
		console.error(error);
		return Observable.throw(error.json() || 'Server error');
	}

}