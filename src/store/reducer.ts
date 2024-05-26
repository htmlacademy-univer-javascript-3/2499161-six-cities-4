import {combineReducers, createReducer} from '@reduxjs/toolkit';
import {
  requireAuthorization, setFavoritesDataLoadingStatus,
  setOffersDataLoadingStatus, setUserDataLoadingStatus,
  updateCity,
  updateCurrentOffer, updateCurrentReviews, updateFavorites, updateFavoritesCounter,
  updateOffers, updateUserLogin
} from './action.ts';
import {AuthorizationStatus, InitialStateFavorites, InitialStateOffer, InitialStateUser} from '../types/offer.ts';

const initialStateOffer: InitialStateOffer = {
  city: 'Paris',
  offers: [],
  cityOffers: [],
  isOffersDataLoading: true,
  currentOffer: undefined,
  currentReviews: []
};

const InitialStateFavorites: InitialStateFavorites = {
  favorites: [],
  favoritesCounter: 0,
  isFavouriteDataLoading: true
};

const InitialStateUser: InitialStateUser = {
  isUserDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userLogin: null
};

const OfferReducer = createReducer(initialStateOffer, (builder) => {
  builder
    .addCase(updateCity, (state, action) => {
      state.city = action.payload;
      state.cityOffers = state.offers.filter((o) => o.city.name === state.city);
    })
    .addCase(updateOffers, (state, action) => {
      state.offers = action.payload;
      state.cityOffers = state.offers.filter((o) => o.city.name === state.city);
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(updateCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(updateCurrentReviews, (state, action) => {
      state.currentReviews = action.payload;
    });
});

const FavoutiesReducer = createReducer(InitialStateFavorites, (builder) => {
  builder
    .addCase(setFavoritesDataLoadingStatus, (state, action) => {
      state.isFavouriteDataLoading = action.payload;
    })
    .addCase(updateFavorites, (state, action) => {
      state.favorites = action.payload;
      state.favoritesCounter = state.favorites.length;
    })
    .addCase(updateFavoritesCounter, (state, action) => {
      state.favoritesCounter = action.payload;
    });
});

const UserReducer = createReducer(InitialStateUser, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(updateUserLogin, (state, action) => {
      state.userLogin = action.payload;
    })
    .addCase(setUserDataLoadingStatus, (state, action) => {
      state.isUserDataLoading = action.payload;
    });
});

export const reducer = combineReducers({
  user: UserReducer,
  offers: OfferReducer,
  favorites: FavoutiesReducer
});
