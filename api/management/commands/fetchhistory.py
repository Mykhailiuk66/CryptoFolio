import time
from datetime import date
from django.core.management.base import BaseCommand
from ...utils.exchange_managers import ExchangeManagerFactory
from ...utils.misc import create_or_update_coin_exchange_info_bulk


class Command(BaseCommand):
    help = "Fetches history prices for all coins"

    def add_arguments(self, parser):
        parser.add_argument("exchanges_names", nargs="+", type=str)

    def handle(self, *args, **options):
        for e_name in options["exchanges_names"]:
            manager = ExchangeManagerFactory.create(e_name)

            symbols = manager.get_symbols()

            total_symbols = len(symbols)
            counter = 0
            for symbol in symbols:
                try:
                    infos_list = []

                    history_prices = manager.get_history_prices(symbol=symbol)
                    for i, h in enumerate(history_prices[:-1]):
                        ticker_info, info_date = manager.format_ticker_history(
                            symbol, h)

                        info = {'ticker_info': ticker_info,
                                'exchange_name': e_name,
                                'info_date': info_date}

                        if info_date > date(2023, 1, 1) or (i % 4 == 0):
                            infos_list.append(info)

                    create_or_update_coin_exchange_info_bulk(infos_list)
                except Exception as ex:
                    print(ex)
                finally:
                    time.sleep(2)
                    counter += 1
                    print(f"{counter}/{total_symbols} - {symbol}")
