export const PAYMENTS_CHANGE_PAYMENTS_DATA = "PAYMENTS_CHANGE_PAYMENTS_DATA";

export const setCurrentPaymentsData = (currentPaymentsData) => ({
  type: PAYMENTS_CHANGE_PAYMENTS_DATA,
  payload: currentPaymentsData,
});

export const fetchPayment = (token, accountId, osbbId, currentWorkPeriod) => {
  return async (dispatch) => {
    try {
      const answerPromise = await fetch(
        "https://app.osbb365.com/api/tenant/payments?accountId=" +
          accountId.id +
          "&osbbId=" +
          osbbId +
          "&workPeriod=" +
          currentWorkPeriod,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token + "",
          },
        }
      );

      const answer = await answerPromise.json();
      let payments = new Array();
      for (var i = 0; i < answer.length; i++) {
        var payment = answer[i];
        var data = {
          contribution: payment.captionService,
          sum: payment.paymentAmount,
          paymentDate: getDateString(payment.dateOfPayment),
          bank: payment.captionBank,
        };
        payments.push(data);
      }
      dispatch(setCurrentPaymentsData(payments));
    } catch (error) {
      console.log("fetchPayment", "error");
    }
  };
};

function getDateString(data) {
  if (data == null) return;
  var date = new Date(data);
  var month;
  switch (date.getMonth()) {
    case 0:
      month = " січ. ";
      break;
    case 1:
      month = " лют. ";
      break;
    case 2:
      month = " бер. ";
      break;
    case 3:
      month = " квіт. ";
      break;
    case 4:
      month = " трав. ";
      break;
    case 5:
      month = " черв. ";
      break;
    case 6:
      month = " лип. ";
      break;
    case 7:
      month = " серп. ";
      break;
    case 8:
      month = " вер. ";
      break;
    case 9:
      month = " жовт. ";
      break;
    case 10:
      month = " лист. ";
      break;
    case 11:
      month = " груд. ";
      break;
  }
  return date.getDate() + month + date.getFullYear();
}
