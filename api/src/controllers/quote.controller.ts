import express, { Request, Response, Router } from 'express';
import { handleError, ApiError } from '../error';
import { ResponseInterface } from '../interfaces/response_interface';
import { getExchangeRate } from '../services/Exchange';
import  validationsHandler  from '../middlewares/validator';
import  validations  from '../middlewares/quote.validations';


const router = Router();

router.get('/',validations, validationsHandler, async (req: Request, res: Response) => {
  try {
    const { baseCurrency, quoteCurrency, baseAmount } = req.query;
    let response = {} as ResponseInterface;
    const amount = parseFloat(baseAmount as string);
    const result = await getExchangeRate(baseCurrency as string, quoteCurrency as string, amount);
    console.log(result);
    response = {
      exchangeRate: parseFloat(result.conversion_rate.toFixed(3)),
      quoteAmount: parseFloat((result.conversion_result * 100).toFixed(3)),
      base_code: result.base_code,
      target_code: result.target_code,
    };
    res.status(200).json(response);
  } catch (error) {
    const custom = new ApiError(0, 'Error');
    handleError(custom, req, res);
    return;
  }
});

export default router;
