import {Point} from '../../types/offer.tsx';
import {CardsListMemo} from '../../components/offers-list/offers-list.tsx';
import {constCities, filters} from '../../const/const.tsx';
import {useState} from 'react';
import Map from '../../components/map/map.tsx';
import {store} from '../../store/index.ts';
import Filters from '../../components/filter/filter.tsx';
import CitiesList from '../../components/cities-list/cities-list.tsx';
import Header from '../header/header.tsx';
import EmptyOffer from '../../components/main-empty/main-empty.tsx';

export default function Main () {
  const [currentState, setCurrentState] = useState(store.getState().offers);
  const points = currentState.cityOffers?.map((item) => ({
    lat: item.location.latitude,
    lng: item.location.longitude,
    ...item
  }));
  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(points[0]);
  const handleListItemHover = (listItemName: string) => {
    const currentPoint = points.find((point) => point.id === listItemName);
    setSelectedPoint(currentPoint);
  };
  const [sortType, setSortType] = useState(filters.POPULAR);
  const handleSort = (newSortType: string) => {
    setSortType(newSortType);
  };
  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList currentCity={currentState.city} cities={constCities} setCurrentCity={setCurrentState}/>
          </section>
        </div>
        <div className="cities">
          {currentState.cityOffers.length === 0 ? (
            (<EmptyOffer city={currentState.city}/>)
          ) : (
            < div className = 'cities__places-container container' >
              < section className='cities__places places'>
                <h2 className='visually-hidden'>Places</h2>
                <b className="places__found">{currentState.cityOffers.length.toString()} places to stay
          in {currentState.city}
                </b>
                <Filters handleSort={handleSort}/>
                <CardsListMemo citiesCards={currentState.cityOffers.map((item) => ({
                  ...item,
                  image: item.previewImage,
                  roomName: item.title,
                  roomType: item.type,
                  onListItemHover: handleListItemHover,
                }))}
                sortType={sortType}
                />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map city={currentState.cityOffers[0].city} points={points} selectedPoint={selectedPoint} height='800px' width='515px' />
                </section>
              </div>
            </div>)}
        </div>
      </main>
    </div>
  );
}
