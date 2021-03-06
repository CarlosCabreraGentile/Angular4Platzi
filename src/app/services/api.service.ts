import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
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
	httpGet(endpoint: string) {

		// Add timestamp to avoid cache
		if (endpoint.indexOf('?') >= 0) {
			endpoint += '&'
		}
		else {
			endpoint += '?'
		}
		const timestamp = + new Date();
		endpoint += '_t=' + timestamp;

		return this.http.get(this.baseUrl + endpoint) //, { headers: this.getHttpHeaders() })
			.pipe(map((response: any) => response.json()))
			.pipe(catchError(this.handleError));
	}

	/**
	 * HTTP Post
	 * @param endpoint
	 * @param dataPost
	 * @returns {Observable<R>}
	 */
	httpPost(endpoint, dataPost, uploadFile = false): Observable<any> {
		const subject = new Subject<any>();
		let json = null;
		if (dataPost) {
			json = JSON.stringify(dataPost);
		}
		this.http.post(this.baseUrl + endpoint, json, { "headers": new Headers({ "Content-Type": "application/json" }) }) //, { headers: this.getHttpHeaders() })
			.pipe(map((response: any) => response.json()))
			.pipe(catchError(this.handleError))
			.subscribe(
				res => subject.next(res),
				err => subject.error(err),
				() => subject.complete()
			);
		return subject.asObservable();
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
	 * @param endpoint
	 * @param dataPost
	 * @param localApi
	 * @returns {Observable<R>}
	 */
	httpPut(endpoint, dataPost, mockapi: boolean = false): Observable<any> {
		const subject = new Subject<any>();
		const json = JSON.stringify(dataPost);
		this.http.put(this.baseUrl + endpoint, json, { "headers": new Headers({ "Content-Type": "application/json" }) }) //, { headers: this.getHttpHeaders() })
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