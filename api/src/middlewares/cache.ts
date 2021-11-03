
import { Request, Response, NextFunction } from 'express';
import { ResponseInterface } from '../interfaces/response_interface';
import { ApiError, handleError } from '../error';
import { IcacheResult } from '../interfaces/cache_result_interface';

import  LRUCache from '../utils/lruCache';


export const cacheLayer = new LRUCache(4);

export const verifyCache = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { baseCurrency, quoteCurrency, baseAmount } = req.query;
    if (cacheLayer.get(`${baseCurrency}_${quoteCurrency}`)) {
      const cache_result: IcacheResult | undefined = JSON.parse(
        cacheLayer.get(`${baseCurrency}_${quoteCurrency}`)
      );
      if (cache_result) {
        const response = {
          exchangeRate: parseFloat(cache_result.conversion_rate.toFixed(3)),
          quoteAmount: parseInt(
            (cache_result.conversion_rate * parseInt(baseAmount as string) * 100).toFixed(3)
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
