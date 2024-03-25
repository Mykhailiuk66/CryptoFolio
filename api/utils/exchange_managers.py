import os
from binance.spot import Spot as BinanceSpotClient
from pybit.unified_trading import HTTP as BybitClient


class ExchangeManager:
    def get_tickers_info(self):
        raise NotImplementedError(
            "Subclasses must implement fetch_prices method.")

    @staticmethod
    def format_ticker_info(data):
        raise NotImplementedError(
            "Subclasses must implement format_tickers_info method.")


class BinanceManager(ExchangeManager):
    def __init__(self):
        self.client = BinanceSpotClient()

    def get_tickers_info(self):
        try:
            tickers = self.client.ticker_24hr()
        except:
            tickers = []

        return tickers

    @staticmethod
    def format_ticker_info(data: dict):
        symbol = data.get('symbol')
        if symbol:
            coin = symbol.replace('USDT', '').strip()

        return {
            'coin': coin,
            'volume': data.get('volume'),
            'price': data.get('lastPrice'),
            'prev_price_24h': data.get('prevClosePrice'),
            'high_price': data.get('highPrice'),
            'low_price': data.get('lowPrice'),
        }


class BybitManager(ExchangeManager):
    def __init__(self):
        self.client = BybitClient()

    def get_tickers_info(self):
        try:
            tickers = self.client.get_tickers(
                category="spot",
            )['result']['list']
        except:
            tickers = []

        return tickers


    @staticmethod
    def format_ticker_info(data: dict):
        symbol = data.get('symbol')
        if symbol:
            coin = symbol.replace('USDT', '').strip()

        return {
            'coin': coin,
            'volume': data.get('volume24h'),
            'price': data.get('lastPrice'),
            'prev_price_24h': data.get('prevPrice24h'),
            'high_price': data.get('highPrice24h'),
            'low_price': data.get('lowPrice24h'),
        }


class ExchangeManagerFactory:
    @staticmethod
    def create(exchange):
        if exchange == 'binance':
            return BinanceManager()
        elif exchange == 'bybit':
            return BybitManager()
        else:
            raise ValueError(f"Invalid exchange: {exchange}")

