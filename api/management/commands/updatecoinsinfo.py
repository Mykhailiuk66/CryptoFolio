from datetime import date
import re
from django.core.management.base import BaseCommand
from ...utils.exchange_managers import ExchangeManagerFactory
from ...utils.misc import create_or_update_coin_exchange_info_bulk

exchanges = ('binance', 'bybit', 'okx', 'kucoin', 'bitget', )

class Command(BaseCommand):
    help = "Gets the latest coins data from all exchanges"

    def handle(self, *args, **options):
        pattern = r"^(USDT.*|.*USDT)$"
        for e in exchanges:
            try:
                manager = ExchangeManagerFactory.create(e)

                tickers = manager.get_tickers_info()
                tickers_info_list = []
                for ticker in tickers:
                    try:
                        if re.match(pattern, manager.get_symbol(ticker), re.IGNORECASE):
                            formatted_t = manager.format_ticker_info(ticker)
                            if formatted_t.get('price', 0) == 0: continue

                            info = {'ticker_info': formatted_t,
                                    'exchange_name': e,
                                    'info_date': date.today()}

                            tickers_info_list.append(info)
                    except Exception as ex:
                        print(f"Error during tickers_info creation ({e}, {manager.get_symbol(ticker)}): {ex}")

                create_or_update_coin_exchange_info_bulk(tickers_info_list)
            except Exception as ex:
                print(ex)

