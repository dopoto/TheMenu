import { createAction, props } from '@ngrx/store';

import { CurrentLocationActionTypes } from './_app-action-types';
import { ApplicationError } from 'src/app/core/models/application-error';
import { Order } from 'src/app/core/models/order';

const actionTypes = CurrentLocationActionTypes;

export const addOrder = createAction(
    actionTypes.addOrder,
    props<{ order: Order }>()
);

export const addOrderOk = createAction(
    actionTypes.addOrderOk,
    props<{ order: Order }>()
);

export const addOrderError = createAction(
    actionTypes.addOrderError,
    props<{ error: ApplicationError }>()
);