export function calculateTotal (spend_vs_earn, data) {
    let expenses = 0;
    let income = 0;
  
    data.forEach( item => {
      if (item.spend_vs_earn === spend_vs_earn) {
        expenses += Number(item.amount.$numberDecimal);
      } else {
        income += Number(item.amount.$numberDecimal);
      }
      return income.toFixed(2);
    });
    return expenses.toFixed(2);
  }

// export function calculateCategoryTotal (category, data) {
//     let catTotal = 0;
    
//     data.forEach( item => {
//         if (item.category == category) {
//         catTotal += Number(item.amount.$numberDecimal);
//         }
//     });

//     return catTotal.toFixed(2);
// }

export function calculateCategoryTotal (category, data = itemData, spend_vs_earn = false) {

  let catTotal = data.filter(item => 
    item.category == category && item.spend_vs_earn == spend_vs_earn ).reduce((acc, array ) => 
    acc + Number(array.amount.$numberDecimal), 0)

  return catTotal.toFixed(2);
}
