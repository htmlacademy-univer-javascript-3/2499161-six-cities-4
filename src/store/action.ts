import {createAction} from '@reduxjs/toolkit';
import {AuthorizationStatus, FullOffer, OfferType, Review} from '../types/offer.tsx';

export const updateOffers = createAction<OfferType[]>('updateOffers');

export const updateCity = createAction<string>('updateCity');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const setUserDataLoadingStatus = createAction<boolean>('data/setUserDataLoadingStatus');

export const updateCurrentOffer = createAction<FullOffer>('data/updateCurrentOffer');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const updateUserLogin = createAction<string | null>('user/updateUserLogin');


export const setFavoritesDataLoadingStatus = createAction<boolean>('favorites/setFavoritesDataLoadingStatus');

export const updateFavorites = createAction<OfferType[]>('favorites/updateFavorites');

export const updateFavoritesCounter = createAction<number>('favorites/updateFavoritesCounter');

export const updateCurrentReviews = createAction<Review[]>('data/updateCurrentReviews');
