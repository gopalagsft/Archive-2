import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'search',
    pure: false
})
@Injectable()
export class searchFilter implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (items !== undefined) {
            if (!items) return [];
            if (!searchText) return items;

            return items.filter(item => {
                return Object.keys(item).some(key => {
                    return String(item[key]).toLowerCase().includes(searchText.toLowerCase());
                });
            });
        }
    }
}
