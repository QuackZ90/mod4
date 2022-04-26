export function calculateTotal (spend_vs_earn = false, data) {
    let sum = 0;
    
    data.forEach( item => {
        if (item.spend_vs_earn == spend_vs_earn) {
        sum += Number(item.amount.$numberDecimal)
        }
    });
    
    return sum.toFixed(2); // calculateTotal spend_vs_earn default set to 'false'
}

export function calculateCategoryTotal (category, data) {
    let sum = 0;
    
    data.forEach( item => {
        if (item.category == category) {
        sum += Number(item.amount.$numberDecimal);
        }
    });

    return sum.toFixed(2);
}
