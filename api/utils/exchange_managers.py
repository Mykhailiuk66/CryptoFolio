from datetime import date, timedelta
from binance.spot import Spot as BinanceSpotClient
from pybit.unified_trading import HTTP as BybitClient
from okx.MarketData import MarketAPI as OkxClient
from kucoin.client import Market as KucoinClient
from pybitget import Client as BitgetClient


class ExchangeManager:
    SETTLE_COIN = 'USDT'

    def get_tickers_info(self):
        raise NotImplementedError(
            "Subclasses must implement get_tickers_info method.")

    def get_symbol(self):
        raise NotImplementedError(
            "Subclasses must implement get_symbol method.")

    def get_symbols(self):
        raise NotImplementedError(
            "Subclasses must implement get_symbols method.")

    def get_history_prices(self):
        raise NotImplementedError(
            "Subclasses must implement get_history_prices method.")

    @staticmethod
    def format_ticker_history(symbol, ticker_data):
        raise NotImplementedError(
            "Subclasses must implement format_ticker_history method.")

    @staticmethod
    def format_ticker_info(data):
        raise NotImplementedError(
            "Subclasses must implement format_ticker_info method.")


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

    def get_symbols(self):
        return [ticker['symbol'] for ticker in self.client.ticker_price() if self.SETTLE_COIN in ticker['symbol']]

    def get_history_prices(self, symbol, interval="1w"):
        return self.client.klines(symbol=symbol,
                                  interval=interval,
                                  limit=1000,
                                  )

    @staticmethod
    def format_ticker_history(symbol, ticker_data):
        coin = symbol.replace(ExchangeManager.SETTLE_COIN, '').strip()
        formatted_info = {
            'coin': coin,
            'price': float(ticker_data[4]),
            'volume': float(ticker_data[5]),
            'prev_price_24h': float(ticker_data[1]),
            'high_price': float(ticker_data[2]),
            'low_price': float(ticker_data[3]),
        }
        info_date = date.fromtimestamp(float(ticker_data[6]) / 1000)

        return formatted_info, info_date

    @staticmethod
    def format_ticker_info(data: dict):
        coin = data.get('symbol').replace(
            ExchangeManager.SETTLE_COIN, '').strip()

        return {
            'coin': coin,
            'volume': float(data.get('volume')),
            'price': float(data.get('lastPrice')),
            'prev_price_24h': float(data.get('prevClosePrice')),
            'high_price': float(data.get('highPrice')),
            'low_price': float(data.get('lowPrice')),
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

    def get_symbols(self):
        return [ticker['symbol'] for ticker in self.client.get_tickers(category='spot')['result']['list'] if self.SETTLE_COIN in ticker['symbol']]

    def get_history_prices(self, symbol, interval="W"):
        return self.client.get_kline(symbol=symbol,
                                     interval=interval,
                                     limit=1000,
                                     )['result']['list'][::-1]

    @staticmethod
    def format_ticker_history(symbol, ticker_data):
        coin = symbol.replace(ExchangeManager.SETTLE_COIN, '').strip()
        formatted_info = {
            'coin': coin,
            'price': float(ticker_data[4]),
            'volume': float(ticker_data[5]),
            'prev_price_24h': float(ticker_data[1]),
            'high_price': float(ticker_data[2]),
            'low_price': float(ticker_data[3]),
        }
        # change for different interval
        info_date = date.fromtimestamp(
            float(ticker_data[0]) / 1000) + timedelta(weeks=1)

        return formatted_info, info_date

    @staticmethod
    def format_ticker_info(data: dict):
        coin = data.get('symbol').replace(
            ExchangeManager.SETTLE_COIN, '').strip()

        return {
            'coin': coin,
            'volume': float(data.get('volume24h')),
            'price': float(data.get('lastPrice')),
            'prev_price_24h': float(data.get('prevPrice24h')),
            'high_price': float(data.get('highPrice24h')),
            'low_price': float(data.get('lowPrice24h')),
        }


class OkxManager(ExchangeManager):
    def __init__(self):
        self.client = OkxClient(debug=False, flag='0')

    def get_tickers_info(self):
        try:
            tickers = self.client.get_tickers(instType='SPOT')['data']
        except:
            tickers = []

        return tickers

    def get_symbol(self, ticker):
        return ticker.get('instId')

    def get_symbols(self):
        return [ticker['instId'] for ticker in self.client.get_index_tickers(quoteCcy=ExchangeManager.SETTLE_COIN)['data'] if self.SETTLE_COIN in ticker['instId']]

    def get_history_prices(self, symbol, interval="1W"):
        history_prices = []

        before = ''
        while True:
            resp = self.client.get_candlesticks(instId=symbol,
                                                after=before,
                                                bar=interval,
                                                limit=300)['data']
            if not resp:
                break

            history_prices.extend(resp)
            before = resp[-1][0]
        return history_prices[::-1]

    @staticmethod
    def format_ticker_history(symbol, ticker_data):
        coin = symbol.replace(
            f'-{ExchangeManager.SETTLE_COIN}', '').strip()

        formatted_info = {
            'coin': coin,
            'price': float(ticker_data[4]),
            'volume': float(ticker_data[5]),
            'prev_price_24h': float(ticker_data[1]),
            'high_price': float(ticker_data[2]),
            'low_price': float(ticker_data[3]),
        }
        # change for different interval
        info_date = date.fromtimestamp(
            float(ticker_data[0]) / 1000) + timedelta(weeks=1)

        return formatted_info, info_date

    @staticmethod
    def format_ticker_info(data: dict):
        coin = data.get('instId').replace(
            f'-{ExchangeManager.SETTLE_COIN}', '').strip()

        return {
            'coin': coin,
            'volume': float(data.get('vol24h')),
            'price': float(data.get('last')),
            'prev_price_24h': float(data.get('open24h')),
            'high_price': float(data.get('high24h')),
            'low_price': float(data.get('low24h')),
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

    def get_symbols(self):
        return [ticker['symbolName'] for ticker in self.client.get_all_tickers()['ticker'] if self.SETTLE_COIN in ticker['symbolName']]

    def get_history_prices(self, symbol, interval="1week"):
        return self.client.get_kline(symbol=symbol,
                                     kline_type=interval)[::-1]

    @staticmethod
    def format_ticker_history(symbol, ticker_data):
        coin = symbol.replace(f'-{ExchangeManager.SETTLE_COIN}', '').strip()
        formatted_info = {
            'coin': coin,
            'price': float(ticker_data[2]),
            'volume': float(ticker_data[5]),
            'prev_price_24h': float(ticker_data[1]),
            'high_price': float(ticker_data[3]),
            'low_price': float(ticker_data[4]),
        }
        # change for different interval
        info_date = date.fromtimestamp(
            float(ticker_data[0])) + timedelta(weeks=1)

        return formatted_info, info_date

    @staticmethod
    def format_ticker_info(data: dict):
        coin = data.get('symbolName').replace(
            f'-{ExchangeManager.SETTLE_COIN}', '').strip()
        return {
            'coin': coin,
            'volume': float(data.get('vol')),
            'price': float(data.get('last')),
            'prev_price_24h': float(data.get('last')) + float(data.get('changePrice')),
            'high_price': float(data.get('high')),
            'low_price': float(data.get('low')),
        }


class BitgetManager(ExchangeManager):
    def __init__(self):
        self.client = BitgetClient(
            api_key="", api_secret_key="", passphrase="")

    def get_tickers_info(self):
        try:
            tickers = self.client.spot_get_tickers()['data']
        except:
            tickers = []

        return tickers

    def get_symbol(self, ticker):
        return ticker.get('symbol')

    def get_symbols(self):
        return [ticker['symbol'] for ticker in self.client.spot_get_tickers()['data'] if self.SETTLE_COIN in ticker['symbol']]

    def get_history_prices(self, symbol, interval="1Wutc"):
        params = {
            'symbol': symbol,
            'granularity': interval,
            'limit': 1000,
        }
        return self.client._request("GET", '/api/v2/spot/market/candles', params)['data']

    @staticmethod
    def format_ticker_history(symbol, ticker_data):
        coin = symbol.replace(ExchangeManager.SETTLE_COIN, '').strip()
        formatted_info = {
            'coin': coin,
            'price': float(ticker_data[4]),
            'volume': float(ticker_data[5]),
            'prev_price_24h': float(ticker_data[1]),
            'high_price': float(ticker_data[2]),
            'low_price': float(ticker_data[3]),
        }
        # change for different interval
        info_date = date.fromtimestamp(
            float(ticker_data[0]) / 1000) + timedelta(weeks=1)

        return formatted_info, info_date

    @staticmethod
    def format_ticker_info(data: dict):
        coin = data.get('symbol').replace(
            ExchangeManager.SETTLE_COIN, '').strip()
        return {
            'coin': coin,
            'volume': float(data.get('baseVol')),
            'price': float(data.get('close')),
            'prev_price_24h': float(data.get('openUtc0')),
            'high_price': float(data.get('high24h')),
            'low_price': float(data.get('low24h')),
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
