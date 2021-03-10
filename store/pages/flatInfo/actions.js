export const FLAT_INFO_GENERAL_DATA = "FLAT_INFO_GENERAL_DATA";
export const FLAT_INFO_GENERAL_DATA_CLEAR = "FLAT_INFO_GENERAL_DATA_CLEAR";
export const FLAT_INFO_LODGER_DATA = "FLAT_INFO_LODGER_DATA";
export const FLAT_INFO_LODGER_DATA_CLEAR = "FLAT_INFO_LODGER_DATA_CLEAR";
export const FLAT_INFO_PARAMETERS = "FLAT_INFO_PARAMETERS";
export const FLAT_INFO_PARAMETERS_CLEAR = "FLAT_INFO_PARAMETERS_CLEAR";
export const FLAT_INFO_PRIVILEGES = "FLAT_INFO_PRIVILEGES";
export const FLAT_INFO_PRIVILEGES_CLEAR = "FLAT_INFO_PRIVILEGES_CLEAR";
export const FLAT_INFO_CONTRIBUTIONS = "FLAT_INFO_CONTRIBUTIONS";
export const FLAT_INFO_CONTRIBUTIONS_CLEAR = "FLAT_INFO_CONTRIBUTIONS_CLEAR";
export const FLAT_INFO_INDIVIDUAL_CONTRIBUTIONS =
  "FLAT_INFO_INDIVIDUAL_CONTRIBUTIONS";
export const FLAT_INFO_INDIVIDUAL_CONTRIBUTIONS_CLEAR =
  "FLAT_INFO_INDIVIDUAL_CONTRIBUTIONS_CLEAR";
export const FLAT_INFO_COUNTERS = "FLAT_INFO_COUNTERS";
export const FLAT_INFO_COUNTERS_CLEAR = "FLAT_INFO_COUNTERS_CLEAR";
export const FLAT_INFO_CONTRACTS = "FLAT_INFO_CONTRACTS";
export const FLAT_INFO_CONTRACTS_CLEAR = "FLAT_INFO_CONTRACTS_CLEAR";

export const setFlatInfoGeneralData = (flatInfoGeneralData) => ({
  type: FLAT_INFO_GENERAL_DATA,
  payload: flatInfoGeneralData,
});

export const setFlatInfoGeneralDataClear = (flatInfoGeneralData) => ({
  type: FLAT_INFO_GENERAL_DATA_CLEAR,
  payload: [],
});

export const setflatInfoLodgerData = (flatInfoLodgerData) => ({
  type: FLAT_INFO_LODGER_DATA,
  payload: flatInfoLodgerData,
});

export const setflatInfoLodgerDataClear = (flatInfoLodgerData) => ({
  type: FLAT_INFO_LODGER_DATA_CLEAR,
  payload: [],
});

export const setFlatInfoParameters = (flatInfoParameters) => ({
  type: FLAT_INFO_PARAMETERS,
  payload: flatInfoParameters,
});

export const setFlatInfoParametersClear = (flatInfoParameters) => ({
  type: FLAT_INFO_PARAMETERS_CLEAR,
  payload: [],
});

export const setFlatInfoPrivileges = (flatInfoPrivileges) => ({
  type: FLAT_INFO_PRIVILEGES,
  payload: flatInfoPrivileges,
});

export const setFlatInfoPrivilegesClear = (flatInfoPrivileges) => ({
  type: FLAT_INFO_PRIVILEGES_CLEAR,
  payload: [],
});

export const setFlatInfoContributions = (flatInfoContributions) => ({
  type: FLAT_INFO_CONTRIBUTIONS,
  payload: flatInfoContributions,
});

export const setFlatInfoContributionsClear = (flatInfoContributions) => ({
  type: FLAT_INFO_CONTRIBUTIONS_CLEAR,
  payload: [],
});

export const setFlatInfoIndividualContributions = (
  flatInfoIndividualContributions
) => ({
  type: FLAT_INFO_INDIVIDUAL_CONTRIBUTIONS,
  payload: flatInfoIndividualContributions,
});

export const setFlatInfoIndividualContributionsClear = (
  flatInfoIndividualContributions
) => ({
  type: FLAT_INFO_INDIVIDUAL_CONTRIBUTIONS_CLEAR,
  payload: [],
});

export const setFlatInfoCounters = (flatInfoCounters) => ({
  type: FLAT_INFO_COUNTERS,
  payload: flatInfoCounters,
});

export const setFlatInfoCountersClear = (flatInfoCounters) => ({
  type: FLAT_INFO_COUNTERS_CLEAR,
  payload: [],
});

export const setFlatInfoContracts = (flatInfoContracts) => ({
  type: FLAT_INFO_CONTRACTS,
  payload: flatInfoContracts,
});

export const setFlatInfoContractsClear = (flatInfoContracts) => ({
  type: FLAT_INFO_CONTRACTS_CLEAR,
  payload: [],
});

export const fetchFlatInfoGeneralData = (accountIds, token) => {
  return async (dispatch) => {
    try {
      var ws = new WebSocket(
        "wss://app.osbb365.com/socket.io/?auth_token=" +
          token +
          "&EIO=3&transport=websocket"
      );
      ws.onmessage = (e) => {
        if (e.data.substring(0, 2) == "42") {
          const myObjStr = JSON.stringify(e.data.substring(2, e.data.length));
          var myObj = JSON.parse(myObjStr);
          var data = JSON.parse(myObj);
          for (var i = accountIds.length - 1; i >= 0; i--) {
            for (var j = data[1].UserAccounts.length - 1; j >= 0; j--) {
              if (accountIds[i].number == data[1].UserAccounts[j].number) {
                dispatch(setFlatInfoGeneralData(data[1].UserAccounts[j]));
                break;
              }
            }
          }
          ws.close();
        }
      };
    } catch (error) {
      console.log("fetchFlatInfoGeneralData", "error");
    }
  };
};

export const fetchFlatInfoCounters = (
  accountIds,
  osbbId,
  workPeriods,
  index,
  token
) => {
  return async (dispatch) => {
    try {
      const flatInfoCountersPromise = await fetch(
        "https://app.osbb365.com/api/tenant/counters?accountId=" +
          accountIds[index].id +
          "&osbbId=" +
          osbbId +
          "&workPeriod=" +
          workPeriods[workPeriods.length - 1],
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token + "",
          },
        }
      );
      const responseJson = await flatInfoCountersPromise.json();
      var obj = {
        accountId: accountIds[index],
        data: responseJson.counters,
      };
      dispatch(setFlatInfoCounters(obj));
      if (index != accountIds.length - 1) {
        index++;
        fetchFlatInfoCounters(accountIds, osbbId, workPeriods, index, token);
      }
    } catch (error) {
      console.log("fetchFlatInfoCounters", "error");
    }
  };
};

export const fetchFlatInfoLodgerData = (
  accountIds,
  osbbId,
  workPeriods,
  index,
  token
) => {
  return async (dispatch) => {
    try {
      const flatInfoLodgerDataPromise = await fetch(
        "https://app.osbb365.com/api/tenant/lodgers?accountId=" +
          accountIds[index].id +
          "&osbbId=" +
          osbbId +
          "&workPeriod=" +
          workPeriods[workPeriods.length - 1],
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token + "",
          },
        }
      );
      const responseJson = await flatInfoLodgerDataPromise.json();
      var obj = {
        accountId: accountIds[index],
        data: responseJson,
      };
      dispatch(setflatInfoLodgerData(obj));
      if (index != accountIds.length - 1) {
        index++;
        fetchFlatInfoLodgerData(accountIds, osbbId, workPeriods, index, token);
      }
    } catch (error) {
      console.log("fetchFlatInfoLodgerData", "error");
    }
  };
};

export const fetchFlatInfoParameters = (
  accountIds,
  osbbId,
  workPeriods,
  index,
  token
) => {
  return async (dispatch) => {
    try {
      const flatInfoParametersDataPromise = await fetch(
        "https://app.osbb365.com/api/tenant/parameters?accountId=" +
          accountIds[index].id +
          "&osbbId=" +
          osbbId +
          "&workPeriod=" +
          workPeriods[workPeriods.length - 1],
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token + "",
          },
        }
      );
      const responseJson = await flatInfoParametersDataPromise.json();
      var obj = {
        accountId: accountIds[index],
        data: responseJson,
      };
      dispatch(setFlatInfoParameters(obj));
      if (index != accountIds.length - 1) {
        index++;
        fetchFlatInfoParameters(accountIds, osbbId, workPeriods, index, token);
      }
    } catch (error) {
      console.log("fetchFlatInfoParameters", "error");
    }
  };
};

export const fetchFlatInfoPrivileges = (
  accountIds,
  osbbId,
  workPeriods,
  token
) => {
  return async (dispatch) => {
    try {
      for (var i = 0; i < accountIds.length; i++) {
        const flatInfoPrivilegesPromise = fetch(
          "https://app.osbb365.com/api/tenant/privileges?accountId=" +
            accountIds[i].id +
            "&osbbId=" +
            osbbId +
            "&workPeriod=" +
            workPeriods[workPeriods.length - 1],
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + token + "",
            },
          }
        );
        const responseJson = await flatInfoPrivilegesPromise.json();
        dispatch(setFlatInfoPrivileges(responseJson));
      }
    } catch (error) {
      console.log("fetchFlatInfoPrivileges", "error");
    }
  };
};

export const fetchFlatInfoContributions = (workPeriods, token) => {
  return async (dispatch) => {
    try {
      var ws = new WebSocket(
        "wss://app.osbb365.com/socket.io/?auth_token=" +
          token +
          "&EIO=3&transport=websocket"
      );

      ws.onopen = () => {
        ws.send(
          '4216["/tenant/services/global",{"workPeriod":"' +
            workPeriods[workPeriods.length - 1] +
            '"}]'
        );
      };

      ws.onmessage = (e) => {
        if (e.data.substring(0, 4) == "4316") {
          const myObjStr = JSON.stringify(e.data.substring(4, e.data.length));
          var myObj = JSON.parse(myObjStr);
          var data = JSON.parse(myObj);
          dispatch(setFlatInfoContributions(data[0]));
          ws.close();
        }
      };
    } catch (error) {
      console.log("fetchFlatInfoContributions", "error");
    }
  };
};

export const fetchFlatInfoIndividualContributions = (workPeriods, token) => {
  return async (dispatch) => {
    try {
      var ws = new WebSocket(
        "wss://app.osbb365.com/socket.io/?auth_token=" +
          token +
          "&EIO=3&transport=websocket"
      );

      ws.onopen = () => {
        ws.send(
          '4217["/tenant/services/personal",{"workPeriod":"' +
            workPeriods[workPeriods.length - 1] +
            '"}]'
        );
      };

      ws.onmessage = (e) => {
        if (e.data.substring(0, 4) == "4317") {
          const myObjStr = JSON.stringify(e.data.substring(4, e.data.length));
          var myObj = JSON.parse(myObjStr);
          var data = JSON.parse(myObj);
          dispatch(setFlatInfoIndividualContributions(data[0]));
          ws.close();
        }
      };
    } catch (error) {
      console.log("fetchFlatInfoIndividualContributions", "error");
    }
  };
};

export const fetchFlatInfoContracts = (
  accountIds,
  osbbId,
  workPeriods,
  token
) => {
  return async (dispatch) => {
    try {
      var ws = new WebSocket(
        "wss://app.osbb365.com/socket.io/?auth_token=" +
          token +
          "&EIO=3&transport=websocket"
      );

      ws.onmessage = (e) => {
        if (e.data.substring(0, 2) == "42") {
          const myObjStr = JSON.stringify(e.data.substring(2, e.data.length));
          var myObj = JSON.parse(myObjStr);
          var data = JSON.parse(myObj);
          fetchFlatInfoContractsByAccountId(
            0,
            data[1].UserAccounts,
            accountIds,
            osbbId,
            token
          );
          ws.close();
        }
      };
    } catch (error) {
      console.log("fetchFlatInfoCounters", "error");
    }
  };
};

export const fetchFlatInfoContractsByAccountId = (
  index,
  userAccounts,
  accountIds,
  osbbId,
  token
) => {
  return async (dispatch) => {
    try {
      for (var i = 0; i < userAccounts.length; i++) {
        if (userAccounts[i].number == accountIds[index].number) {
          fetch(
            "https://app.osbb365.com/api/tenant/contracts?accountId=" +
              userAccounts[i].id +
              "&osbbId=" +
              osbbId,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token + "",
              },
            }
          );
          if (responseJson.length != 0) {
            for (var i = 0; i < responseJson.length; i++) {
              var obj = {
                accountId: accountIds[index],
                data: responseJson[i],
              };
              dispatch(setFlatInfoContracts(obj));
            }
          }
        }
      }
      if (index != accountIds.length - 1) {
        index++;
        fetchFlatInfoContractsByAccountId(
          index,
          userAccounts,
          accountIds,
          osbbId,
          token
        );
      }
    } catch (error) {
      console.log("fetchFlatInfoContractsByAccountId", "error");
    }
  };
};
