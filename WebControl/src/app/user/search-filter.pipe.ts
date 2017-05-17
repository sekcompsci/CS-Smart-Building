import { Pipe } from '@angular/core';

@Pipe({
  name: 'searchFilter',
  pure: false
})
export class SearchFilterPipe {

  transform(values: any[], criteria: any): any {
      return values.filter(item =>{
          for (let key in item ) {
            if((""+item[key]).includes(criteria)){
              return true;
            }
          }
          return false;
      });
  }

}
