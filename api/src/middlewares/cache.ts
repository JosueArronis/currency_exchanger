import NodeCache from 'node-cache';
import { Request, Response, NextFunction } from 'express';
import { ResponseInterface } from '../interfaces/response_interface';
import { ApiError, handleError } from '../error';
import { IcacheResult } from '../interfaces/cache_result_interface';

export const cache = new NodeCache({ stdTTL: 15 }); // Just for example can configure it to get more time cache

export const verifyCache = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { baseCurrency, quoteCurrency, baseAmount } = req.query;
    if (cache.has(`${baseCurrency}_${quoteCurrency}`)) {
      const cache_result: IcacheResult | undefined = cache.get(`${baseCurrency}_${quoteCurrency}`);
      if (cache_result) {
        const response = {
          exchangeRate: parseFloat(cache_result.conversion_rate.toFixed(3)),
          quoteAmount: parseFloat(
            (cache_result.conversion_rate * parseFloat(baseAmount as string) * 100).toFixed(3)
          ),
          base_code: cache_result.base_code,
          target_code: cache_result.target_code,
        } as ResponseInterface;
        return res.status(200).json(response);
      }
      return next();
    }
    return next();
  } catch (error) {
    const custom = new ApiError(0, 'Error');
    handleError(custom, req, res);
    return;
  }
};
