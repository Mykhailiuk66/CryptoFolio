from decimal import Decimal
from datetime import date, timedelta
from ..models import PortfolioSnapshot, CoinExchangeInfo, Coin, Exchange
from typing import Dict, List


def calculate_portfolio_snapshots(portfolio):
    latest_date = PortfolioSnapshot.objects.filter(
        portfolio=portfolio).order_by('-created').first()

    if latest_date is None:
        latest_date = portfolio.created.date() - timedelta(days=1)
    else:
        latest_date = latest_date.created

    today = date.today()
    calc_date = latest_date + timedelta(days=1)

    holdings = portfolio.holdings.all()
    while calc_date < today:
        total_value = Decimal(0)
        for holding in holdings:
            latest_price = holding.purchase_price

            if holding.sale_price and (holding.sale_date >= calc_date):
                latest_price = holding.sale_price
            else:
                latest_price_info = CoinExchangeInfo.objects.filter(
                    coin=holding.coin,
                    exchange=holding.exchange,
                    date=calc_date
                ).first()

                if latest_price_info:
                    latest_price = latest_price_info.price

            total_value += latest_price * holding.quantity

        PortfolioSnapshot.objects.create(
            portfolio=portfolio,
            created=calc_date,
            value=total_value
        )

        calc_date += timedelta(days=1)


# [ticker_info: dict, exchange_name: str, date: date]
def create_or_update_coin_exchange_info_bulk(infos_list: List[Dict[str, any]]):
    bulk_instances = []

    coins_num = {}
    for info in infos_list:
        ticker_info = info['ticker_info']
        coin = ticker_info['coin']

        coins_num[coin] = coins_num.get(coin, 0) + 1
        if coins_num[coin] > 1:
            continue

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

    CoinExchangeInfo.objects.bulk_create(objs=bulk_instances,
                                         update_conflicts=True,
                                         update_fields=["price", "volume", "prev_price_24h",
                                                        "high_price", "low_price"],
                                         unique_fields=["coin", "exchange", "date"])
