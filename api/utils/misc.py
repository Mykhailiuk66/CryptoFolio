from decimal import Decimal
from datetime import date, timedelta
from ..models import PortfolioSnapshot, CoinExchangeInfo


def calculate_portfolio_snapshots(portfolio):
    latest_date = PortfolioSnapshot.objects.filter(
        portfolio=portfolio).order_by('-created').first()

    if latest_date is None:
        latest_date = portfolio.created.date()
    else:
        latest_date = latest_date.created

    today = date.today()
    calc_date = latest_date + timedelta(days=1)

    holdings = portfolio.holdings.all()
    while calc_date < today:

        total_value = Decimal(0)
        for holding in holdings:
            latest_price = None

            if holding.sale_price:
                latest_price = holding.sale_price
            else:
                latest_price_info = CoinExchangeInfo.objects.filter(
                    coin=holding.coin,
                    exchange=holding.exchange,
                    date=calc_date
                ).first()

                if latest_price_info:
                    latest_price = latest_price_info.price

            if latest_price:
                total_value += latest_price * holding.quantity

        if total_value > 0:
            new_snapshot = PortfolioSnapshot.objects.create(
                portfolio=portfolio,
                created=calc_date,
                value=total_value
            )

        calc_date += timedelta(days=1)
