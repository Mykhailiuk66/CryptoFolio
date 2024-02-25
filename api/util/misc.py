from decimal import Decimal
from datetime import date, timedelta
from ..models import PortfolioSnapshot, CoinExchangeInfo

def calculate_portfolio_snapshots(portfolio):
    # Find the earliest date for which snapshot needs to be calculated
    earliest_date = PortfolioSnapshot.objects.filter(portfolio=portfolio).order_by('created').first()

    if earliest_date is None:
        earliest_date = portfolio.created.date()
        print(earliest_date, type(earliest_date), '1')
    else:
        earliest_date = earliest_date.created
        print(earliest_date, type(earliest_date), '2')


    today = date.today()
    current_date = earliest_date # + 1 day?

    holdings = portfolio.holdings.all()
    while current_date < today:
        # # Check if a snapshot already exists for the current date
        # existing_snapshot = PortfolioSnapshot.objects.filter(portfolio=portfolio, created=current_date).first()
        # if existing_snapshot:
        #     continue

        total_value = Decimal(0)
        for holding in holdings:
            latest_price = None

            if holding.sale_date:
                latest_price = holding.sale_price
            else:
                latest_price_info = CoinExchangeInfo.objects.filter(
                    coin=holding.coin,
                    exchange=holding.exchange,
                    date=current_date
                ).first()

                if latest_price_info:
                    latest_price = latest_price_info.price

            if latest_price:
                total_value += latest_price * holding.quantity


        print("Calculation date", current_date)

        new_snapshot = PortfolioSnapshot.objects.create(
            portfolio=portfolio,
            created=current_date,
            value=total_value
        )
        current_date += timedelta(days=1)
