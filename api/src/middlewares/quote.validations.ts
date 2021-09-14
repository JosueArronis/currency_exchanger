import { query } from "express-validator";
const validations = [
  query('baseCurrency').exists().withMessage("Missing field 'baseCurrency'"),
  query('baseCurrency')
    .if(query('baseCurrency').exists())
    .isLength({ min: 1 })
    .withMessage('baseCurrency need at least one character'),
  query('baseCurrency')
    .if(query('baseCurrency').exists())
    .isIn(['USD', 'EUR', 'GBP', 'ILS'])
    .withMessage('baseCurrency input is not valid please use USD, EUR, GBP or ILS'),
  query('quoteCurrency').exists().withMessage("Missing field 'quoteCurrency'"),
  query('quoteCurrency')
    .if(query('quoteCurrency').exists())
    .isLength({ min: 1 })
    .withMessage('quoteCurrency need at least one character'),
  query('quoteCurrency')
    .if(query('quoteCurrency').exists())
    .isIn(['USD', 'EUR', 'GBP', 'ILS'])
    .withMessage('quoteCurrency input is not valid please use USD, EUR, GBP or ILS'),
  query('baseAmount').exists().withMessage("Missing field 'baseAmount'"),
  query('baseAmount')
    .if(query('baseAmount').exists())
    .isNumeric()
    .withMessage('baseAmount input is not a number'),
  query('baseAmount')
    .if(query('baseAmount').exists())
    .custom((value) => value > 0)
    .withMessage('baseAmount input need to be  greater than 0 '),
];
export default validations;