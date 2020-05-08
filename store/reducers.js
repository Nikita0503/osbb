import {combineReducers} from 'redux';
import {authReducer} from './auth/reducers';
import {apartmentReducer} from './pages/home/myApartment/apartment/reducers'
import {paymentsReducer} from './pages/home/myApartment/payments/reducers'
import {accrualHistoryReducer} from './pages/home/myApartment/accrualHistory/reducers'
import {actOfReconciliationReducer} from './pages/home/actOfReconciliation/reducers'
import {houseReducer} from './pages/home/myHouse/house/reducers'
import {houseExpensesReducer} from './pages/home/myHouse/houseExpenses/reducers'
import {apartmentHeaderReducer} from './pages/home/monthPicker/reducers'
import {profileReducer} from './pages/profile/reducers'
import {flatInfoReducer} from './pages/flatInfo/reducers'
import {aboutHouseReducer} from './pages/aboutHouse/reducers'
import {applicationsAndOffersReducer} from './pages/offers/applicationsAndOffers/reducers'
import {addOfferReducer} from './pages/offers/addOffer/reducers';
import {advertisementReducer} from './pages/header/advertisement/reducers';
import {addCommentToAdvertisementReducer} from './pages/header/addCommentToAdvertisement/reducers';
import {allChatsReducer} from './pages/header/chats/reducers';
import {selectedChatReducer} from './pages/header/chat/reducers';
import {helpChatReducer} from './pages/header/help/reducers';
import {sendIndicationsReducer} from './pages/sendIndications/reducers'
import {selectedOfferReducer} from './pages/offers/selectedOffer/reducers'
import {addCommentToOfferReducer} from './pages/offers/addCommentToOffer/reducers'
import {paymentSelectionReducer} from './pages/liqpay/paymentSelection/reducers';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
}



const rootReducer = combineReducers({
  auth: authReducer,
  apartment: apartmentReducer,
  payments: paymentsReducer,
  accrualHistory: accrualHistoryReducer,
  actOfReconciliation: actOfReconciliationReducer,
  house: houseReducer,
  houseExpenses: houseExpensesReducer,
  apartmentHeader: apartmentHeaderReducer,
  profile: profileReducer,
  flatInfo: flatInfoReducer,
  aboutHouse: aboutHouseReducer,
  applicationsAndOffers: applicationsAndOffersReducer,
  addOffer: addOfferReducer,
  advertisement: advertisementReducer,
  addCommentToAdvertisement: addCommentToAdvertisementReducer,
  allChats: allChatsReducer,
  selectedChat: selectedChatReducer,
  helpChat: helpChatReducer,
  sendIndications: sendIndicationsReducer,
  selectedOffer: selectedOfferReducer,
  addCommentToOffer: addCommentToOfferReducer,
  paymentSelection: paymentSelectionReducer
});

export default persistReducer(persistConfig, rootReducer)