import { Observable } from 'rxjs';
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Relationship} from "./relationship";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RelationshipService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getRelationships(): Observable<Relationship[]> {
    return this.http.get<Relationship[]>(`${this.apiServerUrl}/relationship/all`)
  }

  public addRelationship(relationship: Relationship): Observable<Relationship> {
    return this.http.post<Relationship>(`${this.apiServerUrl}/relationship/add`, relationship);
  }

  public updateRelationship(relationship: Relationship): Observable<Relationship> {
    return this.http.put<Relationship>(`${this.apiServerUrl}/relationship/update`, relationship);
  }

  public deleteRelationship(relationshipId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/relationship/delete/${relationshipId}`);
  }

}
