export function calculateTotal (data = itemData, spend_vs_earn = false) {
  let total = 0;

    if ( data.hasOwnProperty('spend_vs_earn') || spend_vs_earn == false) {
      total = data.filter(item => ! item.hasOwnProperty('spend_vs_earn') ).reduce((acc, array ) =>
      acc + Number(array.amount.$numberDecimal), 0);

      total += data.filter(item => item.spend_vs_earn == false ).reduce((acc, array ) => 
      acc + Number(array.amount.$numberDecimal), 0);
      console.log("Total Expense:", total)

    } else {
      total = data.filter(item => item.spend_vs_earn == true ).reduce((acc, array ) => 
      acc + Number(array.amount.$numberDecimal), 0);
      console.log("Total Income:", total)
    }

  return total.toFixed(2);
}

export function calculateCategoryTotal (category, data = itemData, spend_vs_earn = false) {
  let catTotal = 0;

  if ( data.hasOwnProperty('spend_vs_earn') || spend_vs_earn == false) {
    catTotal = data.filter(item => ! item.hasOwnProperty('spend_vs_earn') && item.category == category).reduce((acc, array ) =>
    acc + Number(array.amount.$numberDecimal), 0);

    catTotal += data.filter(item => item.spend_vs_earn == false && item.category == category).reduce((acc, array ) => 
    acc + Number(array.amount.$numberDecimal), 0);
    console.log("Expense:", category, catTotal)
  } else {
    catTotal = data.filter(item => item.spend_vs_earn == true && item.category == category ).reduce((acc, array ) => 
    acc + Number(array.amount.$numberDecimal), 0);
    console.log("Income:", category, catTotal)
  }
  return catTotal.toFixed(2);
}
