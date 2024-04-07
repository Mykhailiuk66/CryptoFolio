from datetime import date
from .models import Coin, Exchange, CoinExchangeInfo

from .utils.exchange_managers import ExchangeManagerFactory

exchanges = ('binance', 'bybit', 'okx', 'kucoin', 'bitget', )


def update_coins_info():
    for e in exchanges:
        try:
            manager = ExchangeManagerFactory.create(e)

            tickers = manager.get_tickers_info()
            for ticker in tickers:
                if 'USDT' in manager.get_symbol(ticker):
                    formatted_t = manager.format_ticker_info(ticker)
                    create_or_update_coin_exchange_info(formatted_t, e)
        except Exception as ex:
            print(ex)


def create_or_update_coin_exchange_info(ticker_info, exchange_name, date=date.today()):
    coin, c_created = Coin.objects.get_or_create(short_name=ticker_info['coin']) 
    exchange, ex_created = Exchange.objects.get_or_create(slug=exchange_name, defaults={'name': exchange_name.capitalize()})
    
    coin_exchange_info, cx_created = CoinExchangeInfo.objects.update_or_create(
        coin=coin,
        exchange=exchange,
        date=date,
        defaults={
            'price': float(ticker_info['price']),
            'volume': float(ticker_info['volume']),
            'prev_price_24h': float(ticker_info['prev_price_24h']),
            'high_price': float(ticker_info['high_price']),
            'low_price': float(ticker_info['low_price']),
        }
    )
