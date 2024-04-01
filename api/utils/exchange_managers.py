import os
from binance.spot import Spot as BinanceSpotClient
from pybit.unified_trading import HTTP as BybitClient
from okx.MarketData import MarketAPI as OkxClient
from kucoin.client import Market as KucoinClient
from pybitget import Client as BitgetClient

class ExchangeManager:
    def get_tickers_info(self):
        raise NotImplementedError(
            "Subclasses must implement fetch_prices method.")

    def get_symbol(self):
        raise NotImplementedError(
            "Subclasses must implement get_symbol method.")


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
    
    def get_symbol(self, ticker):
        return ticker.get('symbol')

    @staticmethod
    def format_ticker_info(data: dict):
        coin = data.get('symbol').replace('USDT', '').strip()

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

    def get_symbol(self, ticker):
        return ticker.get('symbol')

    @staticmethod
    def format_ticker_info(data: dict):
        coin = data.get('symbol').replace('USDT', '').strip()

        return {
            'coin': coin,
            'volume': data.get('volume24h'),
            'price': data.get('lastPrice'),
            'prev_price_24h': data.get('prevPrice24h'),
            'high_price': data.get('highPrice24h'),
            'low_price': data.get('lowPrice24h'),
        }


class OkxManager(ExchangeManager):
    def __init__(self):
        self.client = OkxClient(debug=False)

    def get_tickers_info(self):
        try:
            tickers = self.client.get_tickers(instType='SPOT')['data']
        except:
            tickers = []

        return tickers

    def get_symbol(self, ticker):
        return ticker.get('instId')

    @staticmethod
    def format_ticker_info(data: dict):
        coin = data.get('instId').replace('-USDT', '').strip()
        return {
            'coin': coin,
            'volume': data.get('vol24h'),
            'price': data.get('last'),
            'prev_price_24h': data.get('open24h'),
            'high_price': data.get('high24h'),
            'low_price': data.get('low24h'),
        }


class KucoinManager(ExchangeManager):
    def __init__(self):
        self.client = KucoinClient()

    def get_tickers_info(self):
        try:
            tickers = self.client.get_all_tickers()['ticker']
        except:
            tickers = []

        return tickers

    def get_symbol(self, ticker):
        return ticker.get('symbolName')

    @staticmethod
    def format_ticker_info(data: dict):
        coin = data.get('symbolName').replace('-USDT', '').strip()
        return {
            'coin': coin,
            'volume': data.get('vol'),
            'price': data.get('last'),
            'prev_price_24h': float(data.get('last')) + float(data.get('changePrice')),
            'high_price': data.get('high'),
            'low_price': data.get('low'),
        }

class BitgetManager(ExchangeManager):
    def __init__(self):
        self.client = BitgetClient(api_key="", api_secret_key="", passphrase="")

    def get_tickers_info(self):
        try:
            tickers = self.client.spot_get_tickers()['data']
        except:
            tickers = []

        return tickers

    def get_symbol(self, ticker):
        return ticker.get('symbol')

    @staticmethod
    def format_ticker_info(data: dict):
        coin = data.get('symbol').replace('USDT', '').strip()
        return {
            'coin': coin,
            'volume': data.get('baseVol'),
            'price': data.get('close'),
            'prev_price_24h': data.get('openUtc0'),
            'high_price': data.get('high24h'),
            'low_price': data.get('low24h'),
        }


class ExchangeManagerFactory:
    @staticmethod
    def create(exchange):
        if exchange == 'binance':
            return BinanceManager()
        elif exchange == 'bybit':
            return BybitManager()
        elif exchange == 'okx':
            return OkxManager()
        elif exchange == 'kucoin':
            return KucoinManager()
        elif exchange == 'bitget':
            return BitgetManager()
        else:
            raise ValueError(f"Invalid exchange: {exchange}")

