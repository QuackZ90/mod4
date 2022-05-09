import currencyAPI from '../api/currencyAPI';
import {CURRENCY_KEY} from '@env';

export default getCurrencyRates =  async (base, symbols) => {

    try{

       const response =  await currencyAPI.get(`latest?base=${base}&symbols=${symbols}`,
            {
                headers: {apikey: CURRENCY_KEY}
            }
       );

    console.log(response.data);
    return (response.data.rates)

    }catch(err){
        console.log(err)
    
    }
};
