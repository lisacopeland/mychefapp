import { Injectable } from '@angular/core';
import { NodesResponseInterface, NodeInterface, KvInterface } from '@interfaces/chef-data.interface';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChefDataService {

  SampleUnfilteredNodes: NodesResponseInterface = {
    Nodes: [
      {
        ID: 'e69dc612-7e67-43f2-9b19-256afd385820',
        Name: 'my test node',
        Platform: {
          Name: 'debian',
          Release: '9.7',
        },
        LastScan: {
          Time: new Date(),
          Status: 'passed',
          PenultimateStatus: 'passed',
        },
        LastClientRun: {
          Time: new Date(),
          Status: 'passed',
          PenultimateStatus: 'passed',
        },
        Tags: [
          {
            Key: 'my tag', Value: 'is a good one',
          }]
      },
      {
        ID: 'e69dc612-7e67-43f2-9b19-256afd385820',
        Name: 'my test node',
        Platform: {
          Name: 'debian',
          Release: '9.7',
        },
        LastScan: {
          Time: new Date(),
          Status: 'passed',
          PenultimateStatus: 'passed',
        },
        LastClientRun: {
          Time: new Date(),
          Status: 'passed',
          PenultimateStatus: 'passed',
        },
        Tags: [
          {
            Key: 'my tag', Value: 'is a good one',
          }
        ]
      },
      {
        ID: '3d10cc8e-1fae-4544-9cc9-2aa6653cc6b3',
        Name: 'another-node',
        Platform: {
          Name: 'debian',
          Release: '9.8',
        },
        LastScan: {
          Time: new Date(),
          Status: 'failed',
          PenultimateStatus: 'passed',
        },
        LastClientRun: {
          Time: new Date(),
          Status: 'passed',
          PenultimateStatus: 'passed',
        },
        Tags: [
          {
            Key: 'my tag', Value: 'is a different one',
          },
        ],
      },
      {
        ID: '06d167be-8db3-42b2-9274-f94095c3cb93',
        Name: 'node',
        Platform: {
          Name: 'amazon',
          Release: '2',
        },
        LastScan: {
          Time: new Date(),
          Status: 'failed',
          PenultimateStatus: 'passed',
        },
        LastClientRun: {
          Time: new Date(),
          Status: 'failed',
          PenultimateStatus: 'passed',
        },
        Tags: [],
      },
      {
        ID: '5043c7e7-7e3e-4c7f-9f64-564e3e69e7e2',
        Name: 'great-node',
        Platform: {
          Name: 'amazon',
          Release: '2',
        },
        LastScan: {
          Time: new Date(),
          Status: 'passed',
          PenultimateStatus: 'passed',
        },
        LastClientRun: {
          Time: new Date(),
          Status: 'failed',
          PenultimateStatus: 'passed',
        },
        Tags: [
          {
            Key: 'my tag', Value: 'is a good one',
          },
        ],
      },
      {
        ID: 'c8cb0b0d-9df7-4540-ae55-9c9d36684afa',
        Name: 'east-node',
        Platform: {
          Name: 'debian',
          Release: '9.6',
        },
        LastScan: {
          Time: new Date(),
          Status: 'passed',
          PenultimateStatus: 'failed',
        },
        LastClientRun: {
          Time: new Date(),
          Status: 'passed',
          PenultimateStatus: 'failed',
        },
        Tags: []
      }
    ],
    Total: 6
  };

  constructor(private http: HttpClient) { }
  nodeData: NodeInterface[];

  getTestData(filterValues: KvInterface[]) {
    return this.SampleUnfilteredNodes;
  }

  getData(filterValues: KvInterface[]): Observable<NodesResponseInterface> {
    const apiUrl = 'localhost:2133/nodes';

    console.log('params will be ' + JSON.stringify(filterValues));
    const params = new HttpParams().set('filters', JSON.stringify(filterValues));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/plain'
      }),
      params
    };
    return this.http
      .get<NodesResponseInterface>(apiUrl, httpOptions)
      .pipe(
        map(data => {
          console.log('from HTTP call');
          console.log(JSON.stringify(data));
          this.nodeData = data.Nodes;
          return data;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      if (!environment.production) {
        console.error('An error occurred:', error.error.message);
      }
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      if (!environment.production) {
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
