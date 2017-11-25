import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Speaker } from './speaker.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SpeakerService {

    private resourceUrl = SERVER_API_URL + 'api/speakers';

    constructor(private http: Http) { }

    create(speaker: Speaker): Observable<Speaker> {
        const copy = this.convert(speaker);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(speaker: Speaker): Observable<Speaker> {
        const copy = this.convert(speaker);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Speaker> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Speaker.
     */
    private convertItemFromServer(json: any): Speaker {
        const entity: Speaker = Object.assign(new Speaker(), json);
        return entity;
    }

    /**
     * Convert a Speaker to a JSON which can be sent to the server.
     */
    private convert(speaker: Speaker): Speaker {
        const copy: Speaker = Object.assign({}, speaker);
        return copy;
    }
}
