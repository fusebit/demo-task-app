import React, {Reducer, ReducerState} from "react";

export interface FusebitReducer<T extends FusebitReducerState> extends Reducer<T, ReducerAction<T>> {}

export enum ReducerNames {
    'login'
}
export enum ActionNames {
    'login'= 'login',
    'logout'= 'logout'
}

export interface ReducerAction<P = any> {
    type: ActionNames,
    payload?: P
}

export type ActionFunction<T extends Array<any>> = (...args: T) => (state: Record<string, object>) => ReducerAction

export type Dispatcher<P = any> =
    (action: ReducerAction<P>) => void;

export interface FusebitStore {
    state: Record<string, object>;
    actions: Record<ActionNames, Function>;
    dispatch: Dispatcher;
    dispatchers: Dispatcher[];
    loadReducer: (name: ReducerNames, [state, dispatcher]:[object, Dispatcher]) => void;
}
// ##########
// States
// ##########
export interface FusebitReducerState {}

export interface LoginState extends FusebitReducerState {
    currentUser?: User
}

// ##########
// USER
// ##########

export interface User {
    id: number;
    name: string;
}


export enum IntegrationType {
    slack = 'slack',
    hubspot = 'hubspot'
}

