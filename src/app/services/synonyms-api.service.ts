import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SynonymsApiService {
  headers!: HttpHeaders;

  constructor(private http: HttpClient) {}

  protected makeRequest(
    method: any,
    endpoint: any,
    params: any,
    responseType?: "json"
  ): Observable<any> {
    const url = `${environment.apiUrl}/${endpoint}`;

    const options = {
      body: params,
      headers: this.headers,
      responseType,
    };

    return this.http.request(method, url, options);
  }

  getSynonyms(synonym: string): Observable<any> {
    return this.makeRequest("GET", `synonyms/${synonym}`, {});
  }
}
