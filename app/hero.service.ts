
import {Injectable}     from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {Hero}           from './hero';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class HeroService {
    constructor (private http: Http) {}

    /*
     private _heroesUrl = 'app/heroes.json'; // URL to JSON file
     */

    //We wrap the heroes array in an object with a data property for the same reason that a data server does: to mitigate the security risk posed by top-level JSON arrays.
    private _heroesUrl = 'app/mock-heroes.json';  // URL to web api

    getHeroes (): Observable<Hero[]> {
        return this.http.get(this._heroesUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addHero (name: string): Observable<Hero>  {

        let body = JSON.stringify({ name });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this._heroesUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }


    private extractData(res: Response) {
        console.log(res);
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body.data || { };
    }

    private handleError (error: any) {
        // In a real world app, we might send the error to remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */