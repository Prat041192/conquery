// @flow

import { type TreeNodeIdType }   from '../common/types/backend';
import { type SearchType }       from './reducer';

export const isSearchResultInChildren = (children?: [], search?: SearchType) => {
    if (!search || !search.result || !children) return false;
    const result = search.result;

    for (var i = 0; i < result.length; i++) {
      const id = result[i];
      for (var j = 0; j < children.length; j++) {
        const childId = children[j];
        if (id.indexOf(childId) >= 0)
          return true;
      }
    }
    return false;
}

export const isInSearchResult = (id: TreeNodeIdType, children?: [], search?: SearchType) => {
    if (!search || !search.result) return false;
    const result = search.result;

    for (var i = 0; i < result.length; i++) {
        const resultId = result[i];
        if (resultId.indexOf(id) >= 0)
        return true;
    }
    if (children && children.length > 0)
        return isSearchResultInChildren(children, search);
    return false;
}