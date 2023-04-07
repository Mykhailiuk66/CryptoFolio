import time
from django.core.management.base import BaseCommand
from ...utils.exchange_managers import ExchangeManagerFactory
from ...cron import create_or_update_coin_exchange_info


class Command(BaseCommand):
    help = "Fetches history prices for all coins"

    def add_arguments(self, parser):
        parser.add_argument("exchange_names", nargs="+", type=str)

    def handle(self, *args, **options):
        for e_name in options["exchange_names"]:
            manager = ExchangeManagerFactory.create(e_name)

            symbols = manager.get_symbols()

            total_symbols = len(symbols)
            counter = 0
            for symbol in symbols:
                try:
                    history_prices = manager.get_history_prices(symbol=symbol)
                    for h in history_prices[:-1]:
                        ticker_info, info_date = manager.format_ticker_history(symbol, h)
                        create_or_update_coin_exchange_info(ticker_info, e_name, date=info_date)
                except Exception as ex:
                    print(ex)
                finally:
                    time.sleep(2)
                    counter += 1
                    print(f"{counter}/{total_symbols} - {symbol}")