import { SET_ALERT, REMOVE_ALERT } from '../types';

export interface IAlertState {
  msg: string; 
  type: string; 
  id: string;
}

const alert_reducer = (state: IAlertState[], action: any) => {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter((alert: IAlertState) => alert.id !== action.payload);
    default:
      return state;
  }
};


export default alert_reducer;
