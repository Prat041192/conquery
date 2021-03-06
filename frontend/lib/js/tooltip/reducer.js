// @flow

import {
  TOGGLE_DISPLAY_TOOLTIP,
  DISPLAY_ADDITIONAL_INFOS,
  TOGGLE_ADDITIONAL_INFOS
} from './actionTypes';

type InfoType = {
  key: string,
  value: string,
};

export type AdditionalInfosType = {
  label: ?string,
  description: ?string,
  matchingEntries: ?number,
  dateRange: ?Object,
  infos: ?InfoType[]
};

export type StateType = {
  displayTooltip: boolean,
  toggleAdditionInfos: boolean,
  additionalInfos: AdditionalInfosType,
};

const initialState = {
  displayTooltip: true,
  toggleAdditionInfos: false,
  additionalInfos: {
    label: null,
    description: null,
    matchingEntries: null,
    dateRange: null,
    infos: null,
  },
};

const setAdditionalInfos = (state, action) => {
  if (state.toggleAdditionInfos)
    return {
      ...state
    }

  return {
    ...state,
    additionalInfos: (action.payload && action.payload.additionalInfos) || {
      label: null,
      description: null,
      matchingEntries: null,
      dateRange: null,
      infos: null,
    }
  };
};

const tooltip = (state: StateType = initialState, action: Object): StateType => {
  switch (action.type) {
    case DISPLAY_ADDITIONAL_INFOS:
      return setAdditionalInfos(state, action);
    case TOGGLE_ADDITIONAL_INFOS:
      return {
        ...state,
        toggleAdditionInfos: !state.toggleAdditionInfos
      };
    case TOGGLE_DISPLAY_TOOLTIP:
      return {
        ...state,
        displayTooltip: !state.displayTooltip
      };
    default:
      return state;
  }
};

export default tooltip;
