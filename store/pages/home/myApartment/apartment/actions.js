import { Alert } from 'react-native';
import { setCurrentWorkPeriod } from '../../monthPicker/actions';

export const APARTMENT_CHANGE_USERDATA = 'APARTMENT_CHANGE_USERDATA';
export const APARTMENT_CHANGE_OSBB_ID = 'APARTMENT_CHANGE_OSBB_ID';
export const APARTMENT_CHANGE_ACCOUNT_ID = 'APARTMENT_CHANGE_ACCOUNT_ID';
export const APARTMENT_CHANGE_ACCOUNT_IDS = 'APARTMENT_CHANGE_ACCOUNT_IDS';
export const APARTMENT_CHANGE_WORK_PERIODS = 'APARTMENT_CHANGE_WORK_PERIODS';
export const APARTMENT_CHANGE_ALL_APARTMENT_DATA = 'APARTMENT_CHANGE_ALL_APARTMENT_DATA';
export const APARTMENT_CHANGE_CURRENT_APARTMENT_DATA = 'APARTMENT_CHANGE_CURRENT_APARTMENT_DATA';
export const APARTMENT_CHANGE_ALL_COSTS_DATA = 'APARTMENT_CHANGE_ALL_COSTS_DATA';
export const APARTMENT_CHANGE_CURRENT_COSTS_DATA = 'APARTMENT_CHANGE_CURRENT_COSTS_DATA';
export const APARTMENT_CHANGE_DEBT_DATA = 'APARTMENT_CHANGE_DEBT_DATA';
export const APARTMENT_CHANGE_LIQPAY_DATA = 'APARTMENT_CHANGE_LIQPAY_DATA';
export const APARTMENT_CHANGE_IS_ACTIVATED = 'APARTMENT_CHANGE_IS_ACTIVATED';
export const APARTMENT_CLEAR_DATA = 'APARTMENT_CLEAR_DATA';

export const clearState = () => ({
  type: APARTMENT_CLEAR_DATA
})

export const setIsActivated = isActivated => ({
  type: APARTMENT_CHANGE_IS_ACTIVATED,
  payload: isActivated
})

export const setUserData = userData => ({
  type: APARTMENT_CHANGE_USERDATA,
  payload: userData
});

export const setOsbbId = osbbId => ({
  type: APARTMENT_CHANGE_OSBB_ID,
  payload: osbbId
});

export const setAccountId = accountId => ({
  type: APARTMENT_CHANGE_ACCOUNT_ID,
  payload: accountId
});

export const setAccountIds = accountIds => ({
  type: APARTMENT_CHANGE_ACCOUNT_IDS,
  payload: accountIds
});

export const setWorkPeriods = workPeriods => ({
  type: APARTMENT_CHANGE_WORK_PERIODS,
  payload: workPeriods
});

export const setAllApartmentData = allApartmentData => ({
  type: APARTMENT_CHANGE_ALL_APARTMENT_DATA,
  payload: allApartmentData
});

export const setCurrentApartmentData = currentApartmentData => ({
  type: APARTMENT_CHANGE_CURRENT_APARTMENT_DATA,
  payload: currentApartmentData
});

export const setAllCostsData = allCostsData => ({
  type: APARTMENT_CHANGE_ALL_COSTS_DATA,
  payload: allCostsData
});

export const setCurrentCostsData = currentCostsData => ({
  type: APARTMENT_CHANGE_CURRENT_COSTS_DATA,
  payload: currentCostsData
});

export const setDebtData = debtData => ({
  type: APARTMENT_CHANGE_DEBT_DATA,
  payload: debtData
});

export const setLiqpayData = liqpayData =>({
  type: APARTMENT_CHANGE_LIQPAY_DATA,
  payload: liqpayData
})

export const fetchUserData = (token) => {
  return async dispatch => {
      try{
          const userDataPromise = await fetch('https://app.osbb365.com/api/user/me', {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token + '',
            },
          })
          const userData = await userDataPromise.json();
          dispatch(setUserData(userData))
      } catch (error) {
          console.log("fetchUserData", error)
      }
  }
}

export const fetchApartmentData = (token, navigation) => {
  return async dispatch => {
    try{
      var ws = new WebSocket(
        'wss://app.osbb365.com/socket.io/?auth_token=' +
          token +
          '&EIO=3&transport=websocket'
      );
      ws.onmessage = e => {
        if (e.data.substring(0, 2) == '42') {
          const myObjStr = JSON.stringify(e.data.substring(2, e.data.length));
          var myObj = JSON.parse(myObjStr);
          var data = JSON.parse(myObj);
          dispatch(setIsActivated(data[1].UserData.isActivated))
          
          if(!data[1].UserData.isActivated){
            Alert.alert('Повідомлення', 'Аккаунт не було активовано головою САПО')
            navigation.navigate('Auth')
            return
          } 
          dispatch(setOsbbId(data[1].OsbbData.OsbbId));
    
          var osbbIds = new Array();
          for (var i = 0; i < data[1].UserAccounts.length; i++) {
            osbbIds.push({
              id: data[1].UserAccounts[i].id,
              number: data[1].UserAccounts[i].number,
            });
          }
          var uniqAccountIds = getUniqueAccountIds(osbbIds);
          let workPeriods = new Array();
          var period;

          for (i = 0; i < data[1].OsbbData.Periods.length; i++) {
            period = data[1].OsbbData.Periods[i].period;
            dispatch(setWorkPeriods(period));
            if (i == data[1].OsbbData.Periods.length - 1) {
              dispatch(setCurrentWorkPeriod(period));
            }
          }
          
          fetchLiqpayData(uniqAccountIds[0].id, data[1].OsbbData.OsbbId, period, token, dispatch);
          fetchDebt(token, uniqAccountIds, 0, data[1].OsbbData.OsbbId, data[1].OsbbData.Periods[data[1].OsbbData.Periods.length - 1].period, dispatch)
          fetchCostsData(token, 0, data[1].OsbbData.Periods, uniqAccountIds[0].id, data[1].OsbbData.OsbbId, dispatch);
          for (i = 0; i < uniqAccountIds.length; i++) {
            fetchGeneralDataApartment(token, data[1].OsbbData.OsbbId, uniqAccountIds[i], data[1].OsbbData.Periods, data[1].UserAccounts, dispatch);
          }
          ws.close();
        }
      };
    } catch (error) {
      console.log("fetchApartmentData", error)
    }
  }
}

function getUniqueAccountIds(data) {
  var accountIds = new Array();
  for (var i = data.length - 1; i >= 0; i--) {
    var isUniq = true;
    for (var j = 0; j < accountIds.length; j++) {
      if (accountIds[j].number == data[i].number) {
        isUniq = false;
        break;
      }
    }
    if (isUniq) {
      accountIds.push(data[i]);
    }
  }
  return accountIds;
}

const fetchLiqpayData = async (accountId, osbbId, workPeriod, token, dispatch) => {
      try{
          const liqpayDataPromise = await fetch(
            'https://app.osbb365.com/api/tenant/checkLiqPay?accountId=' +
              accountId +
              '&osbbId=' +
              osbbId +
              '&workPeriod=' +
              workPeriod,
            {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token + '',
              },
            }
          )
          const liqpayData = await liqpayDataPromise.json();
          dispatch(setLiqpayData(liqpayData))
      } catch (error) {
          console.log("fetchLiqpayData", error)
      }
}

const fetchDebt = async (token, accountIds, index, osbbId, lastWorkPeriod, dispatch) => {
      try{
          const debtPromise = await fetch(
            'https://app.osbb365.com/api/tenant/charges/total?accountId=' +
              accountIds[index].id +
              '&osbbId=' +
              osbbId +
              '&workPeriod=' +
              lastWorkPeriod,
            {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token + '',
              },
            }
          )
          
          const responseJson = await debtPromise.json();
          var sum = getSumDebt(responseJson.chargesList);
          var obj = {
            accountId: accountIds[index],
            debt: sum
          }
          dispatch(setDebtData(obj));
          index++;
          if(index != accountIds.length){
            fetchDebt(token, accountIds, index, osbbId, lastWorkPeriod, dispatch)
          }
      } catch (error) {
          console.log("fetchDebt", error)
      }
  
}

function getSumDebt(data) { 
  let sum = 0;
  for (var i = 0; i < data.length; i++) {
    sum += data[i].finishBalance;
  }
  return sum.toFixed(2);
}

const fetchCostsData = async (token, currentPeriod, workPeriods, accountId, osbbId, dispatch) => {
      try{
          const costsDataPromise = await fetch(
            'https://app.osbb365.com/api/tenant/costs?accountId=' +
              accountId +
              '&osbbId=' +
              osbbId +
              '&workPeriod=' +
              workPeriods[currentPeriod].period,
            {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token + '',
              },
            }
          )
          const responseJson = await costsDataPromise.json();
          
          if (responseJson.length != 0) {
            const data = {
              workPeriod: getMonthByUTC(responseJson[0].workPeriod),
              data: responseJson,
            };
            dispatch(setAllCostsData(data));
            if (currentPeriod == 0) {
              dispatch(setCurrentCostsData(data));
              //console.log("fetchCostsData", data)
            }
          }
          currentPeriod++;
          if (currentPeriod != workPeriods.length){
            fetchCostsData(
              token,
              currentPeriod,
              workPeriods,
              accountId,
              osbbId,
              dispatch
            );
          }        
      } catch (error) {
          console.log("fetchCostsData", error)
      }
}

function getMonthByUTC(utc) {
  var myDate = new Date();
  var tzo = (myDate.getTimezoneOffset() / 60) * -1;
  var localDate = new Date(utc);

  localDate.setHours(localDate.getHours() + tzo + 1);

  var month = '';
  if (localDate.getMonth() + 1 < 10) {
    month += '0';
  }
  month += localDate.getMonth() + 1;
  month += localDate.getFullYear();
  return month;
}

const fetchGeneralDataApartment = async (token, osbbId, accountId, workPeriods, userAccounts, dispatch) => {
      try{
          const generalDataPromise = await fetch('https://app.osbb365.com/api/tenant/charges/total?' +
              'accountId=' +
              accountId.id +
              '&osbbId=' +
              osbbId, {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + token + '',
                },
          })
          const responseJson = await generalDataPromise.json();
          //console.log("alldata", responseJson)
          var accountId = getMaxId(responseJson, userAccounts);
          dispatch(setAccountIds(accountId));
          dispatch(setAccountId(accountId));
          //console.log("workPeriod", responseJson.chargesList)
          for (var j = 0; j < workPeriods.length; j++) {
            var data;
            var list = new Array();
            for (var z = 0; z < responseJson.chargesList.length; z++) {
              
              if (
                workPeriods[j].period ==
                getMonth(responseJson.chargesList[z].workPeriodInDayMonth)
              ) {
                list.push(responseJson.chargesList[z]);
              }
            }
            data = {
              workPeriod: workPeriods[j].period,
              data: list,
              accountId: accountId,
            };
            
            dispatch(setAllApartmentData(data));
          }
      } catch (error) {
          console.log("generalDataApartment", error)
      }
}

function getMaxId(responseJson, userAccounts) {
  let ids = new Array();
  var number;
  for (var i = 0; i < responseJson.chargesList.length; i++) {
    ids.push(responseJson.chargesList[i].personalAccountId);
  }
  for (i = 0; i < ids.length; i++) {
    for (var j = 0; j < userAccounts.length; j++) {
      if (ids[i] == userAccounts[j].id) {
        number = userAccounts[j].number;
        break;
      }
    }
  }
  var maxId = {
    id: ids[ids.length - 1],
    number: number,
  };
  return maxId;
}

function getMonth(data) {
  var month;
  switch (data.substring(0, data.length - 5)) {
    case 'Січень':
      month = '01';
      break;
    case 'Лютий':
      month = '02';
      break;
    case 'Березень':
      month = '03';
      break;
    case 'Квітень':
      month = '04';
      break;
    case 'Травень':
      month = '05';
      break;
    case 'Червень':
      month = '06';
      break;
    case 'Липень':
      month = '07';
      break;
    case 'Серпень':
      month = '08';
      break;
    case 'Вересень':
      month = '09';
      break;
    case 'Жовтень':
      month = '10';
      break;
    case 'Листопад':
      month = '11';
      break;
    case 'Грудень':
      month = '12';
      break;
  }
  return month + data.substring(data.length - 4, data.length);
}