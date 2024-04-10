from datetime import date
from typing import Dict, List
from .models import Coin, Exchange, CoinExchangeInfo

from .utils.exchange_managers import ExchangeManagerFactory

exchanges = ('binance', 'bybit', 'okx', 'kucoin', 'bitget', )


def update_coins_info():
    for e in exchanges:
        try:
            manager = ExchangeManagerFactory.create(e)

            tickers = manager.get_tickers_info()
            tickers_info_list = []
            for ticker in tickers:
                try:
                    if 'USDT' in manager.get_symbol(ticker):
                        formatted_t = manager.format_ticker_info(ticker)

                        info = {'ticker_info': formatted_t,
                                'exchange_name': e,
                                'info_date': date.today()}

                        tickers_info_list.append(info)
                except Exception as ex:
                    print(ex)

            create_or_update_coin_exchange_info_bulk(tickers_info_list)
        except Exception as ex:
            print(ex)


def create_or_update_coin_exchange_info(ticker_info, exchange_name, info_date=date.today()):
    coin, c_created = Coin.objects.get_or_create(
        short_name=ticker_info['coin'])
    exchange, ex_created = Exchange.objects.get_or_create(
        slug=exchange_name, defaults={'name': exchange_name.capitalize()})

    coin_exchange_info, cx_created = CoinExchangeInfo.objects.update_or_create(
        coin=coin,
        exchange=exchange,
        date=info_date,
        defaults={
            'price': float(ticker_info['price']),
            'volume': float(ticker_info['volume']),
            'prev_price_24h': float(ticker_info['prev_price_24h']),
            'high_price': float(ticker_info['high_price']),
            'low_price': float(ticker_info['low_price']),
        }
    )


# [ticker_info: dict, exchange_name: str, date: date]
def create_or_update_coin_exchange_info_bulk(infos_list: List[Dict[str, any]]):
    bulk_instances = []

    for info in infos_list:
        ticker_info = info['ticker_info']
        coin, c_created = Coin.objects.get_or_create(
            short_name=ticker_info['coin'])
        exchange, ex_created = Exchange.objects.get_or_create(
            slug=info['exchange_name'], defaults={'name': info['exchange_name'].capitalize()})

        coin_exchange_info = CoinExchangeInfo(
            coin=coin,
            exchange=exchange,
            date=info['info_date'],
            price=float(ticker_info['price']),
            volume=float(ticker_info['volume']),
            prev_price_24h=float(ticker_info['prev_price_24h']),
            high_price=float(ticker_info['high_price']),
            low_price=float(ticker_info['low_price']),
        )

        bulk_instances.append(coin_exchange_info)

    CoinExchangeInfo.objects.bulk_create(bulk_instances, ignore_conflicts=True)
