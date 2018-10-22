// @flow

import { connect }          from 'react-redux';
import { type Dispatch }    from 'redux-thunk';

import type {
  DateRangeType,
  InfoType
}                           from '../common/types/backend';

import { isEmpty }          from '../common/helpers';
import * as actions         from './actions';
import HoverableBase        from './HoverableBase';

export type AdditionalInfoHoverableNodeType = {
  label: string,
  description: string,
  matchingEntries: number,
  dateRange: DateRangeType,
  additionalInfos: Array<InfoType>
}

// Whitelist the data we pass (especially: don't pass all children)
const additionalInfos = (node: AdditionalInfoHoverableNodeType) => ({
  label: node.label,
  description: node.description,
  // matchingEntries: node.matchingEntries
  matchingEntries: typeof (node.matchingEntries) === "undefined" ? 0 : node.matchingEntries, // changed by Prateek Narula - as part of inteview 
  dateRange: node.dateRange,
  additionalInfos: typeof (node.additionalInfos) === "undefined" ? [
    { key: "No Information", value: "No further information is available" }
  ] : node.additionalInfos
  // additionalInfos : node.additionalInfos  // changed by Prateek Narula - as part of inteview 
});

// Decorates a component with a hoverable node.
// On mouse enter, additional infos about the component are saved in the state
// The Tooltip (and potential other components) might then update their view.
// On mouse leave, the infos are cleared from the state again
const AdditionalInfoHoverable = (Component: any) => {
  const mapStateToProps = () => ({});

  const mapDispatchToProps = (
    dispatch: Dispatch,
    ownProps: { node: AdditionalInfoHoverableNodeType }
  ) => ({
    onDisplayAdditionalInfos: () => {
      const node = ownProps.node;

      i// Code change by Prateek Narula - part of test - 22.10.2018
      // Added has children condition so that the action will be dispatched
      // if the child has been hovered although with null data
      // if (!node.additionalInfos && isEmpty(node.matchingEntries)) return;
      if (!node.additionalInfos && isEmpty(node.matchingEntries) && node.hasChildren) return;

      dispatch(actions.displayAdditionalInfos(additionalInfos(node)))
    },
    onToggleAdditionalInfos: () => {
      const node = ownProps.node;

      if (!node.additionalInfos && isEmpty(node.matchingEntries)) return;

      dispatch([
        actions.toggleAdditionalInfos(additionalInfos(node)),
        actions.displayAdditionalInfos(additionalInfos(node))
      ])
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(HoverableBase(Component));
};

export default AdditionalInfoHoverable;
