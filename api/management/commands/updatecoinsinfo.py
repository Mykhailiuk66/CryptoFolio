from datetime import date
from django.core.management.base import BaseCommand
from ...utils.exchange_managers import ExchangeManagerFactory
from ...utils.misc import create_or_update_coin_exchange_info_bulk

exchanges = ('binance', 'bybit', 'okx', 'kucoin', 'bitget', )

class Command(BaseCommand):
    help = "Gets the latest coins data from all exchanges"

    def handle(self, *args, **options):
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
                        print("Error during tickers_info creation:", ex)

                create_or_update_coin_exchange_info_bulk(tickers_info_list)
            except Exception as ex:
                print(ex)

