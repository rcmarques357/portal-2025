// Stocks Service for Django API Integration
// Handles financial market data API calls

import { api } from '@/utils/api';
import { Stock, MarketIndex, CurrencyPair, Cryptocurrency } from '@/utils/stocksApi';

/**
 * Django Financial Market Endpoints:
 * 
 * GET /api/stocks/
 * Response: [{ "symbol": "AAPL", "name": "Apple Inc.", "price": 150.25, "change": 2.5, ... }]
 * 
 * GET /api/stocks/{symbol}/
 * Response: { "symbol": "AAPL", "price": 150.25, "history": [...], ... }
 * 
 * GET /api/market-indices/
 * Response: [{ "symbol": "^DJI", "name": "Dow Jones", "value": 35000, ... }]
 * 
 * GET /api/currencies/
 * Response: [{ "symbol": "EUR/USD", "rate": 1.18, "change": 0.002, ... }]
 * 
 * GET /api/cryptocurrencies/
 * Response: [{ "symbol": "BTC", "name": "Bitcoin", "price": 45000, ... }]
 * 
 * GET /api/stocks/{symbol}/history/?days=30
 * Response: { "symbol": "AAPL", "history": [150.25, 149.80, ...] }
 * 
 * Django Model Example (models.py):
 * class Stock(models.Model):
 *     symbol = models.CharField(max_length=10, unique=True)
 *     name = models.CharField(max_length=255)
 *     price = models.DecimalField(max_digits=10, decimal_places=2)
 *     change = models.DecimalField(max_digits=10, decimal_places=2)
 *     change_percent = models.DecimalField(max_digits=5, decimal_places=2)
 *     volume = models.BigIntegerField()
 *     market_cap = models.BigIntegerField()
 *     updated_at = models.DateTimeField(auto_now=True)
 */

export const stocksService = {
  // Get all stocks
  async getStocks(): Promise<Stock[]> {
    // When Django is connected:
    // return await api.get<Stock[]>('/stocks/');
    
    return [];
  },

  // Get single stock by symbol
  async getStock(symbol: string): Promise<Stock> {
    // When Django is connected:
    // return await api.get<Stock>(`/stocks/${symbol}/`);
    
    throw new Error('Django backend not connected');
  },

  // Get stock price history
  async getStockHistory(symbol: string, days: number = 30): Promise<number[]> {
    // When Django is connected:
    // const response = await api.get<{ history: number[] }>(`/stocks/${symbol}/history/?days=${days}`);
    // return response.history;
    
    return [];
  },

  // Get market indices
  async getMarketIndices(): Promise<MarketIndex[]> {
    // When Django is connected:
    // return await api.get<MarketIndex[]>('/market-indices/');
    
    return [];
  },

  // Get currency pairs
  async getCurrencyPairs(): Promise<CurrencyPair[]> {
    // When Django is connected:
    // return await api.get<CurrencyPair[]>('/currencies/');
    
    return [];
  },

  // Get cryptocurrencies
  async getCryptocurrencies(): Promise<Cryptocurrency[]> {
    // When Django is connected:
    // return await api.get<Cryptocurrency[]>('/cryptocurrencies/');
    
    return [];
  },
};
