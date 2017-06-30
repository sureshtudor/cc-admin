import {Observable} from "rxjs/Observable";
import {Headers, RequestOptions} from '@angular/http';

export abstract class BaseService {

  static getJsonHttpOption(): RequestOptions {
    let headers = new Headers({'Content-Type': 'application/json'});
    return new RequestOptions({headers: headers});
  }

  static handleError(error: Response | any) {
    console.log('Server Error: ' + error);
    return Observable.throw(error);
  }

  static appendPathParam(url, id): string {
    return url + "/" + id;
  }

  static appendRequestParam(url, param, value): string {
    return url + "?" + param + '=' + value;
  }

  static appendRequestParams(url, param1, value1, param2, value2): string {
    return url + "?" + param1 + '=' + value1 + "&" + param2 + '=' + value2;
  }

  static appendPageParam(url, page, size): string {
    return url + '?page=' + page + '&size=' + size;
  }

  static appendSearchParam(url, key, value): string {
    return url + '/search/findBy' + key + '?val=' + value;
  }

  static toBoolean(val: string): boolean {
    return val === 'true' ? true : false;
  }
}
