from django.contrib import admin

from .models import Exchange
from .models import Coin
from .models import Portfolio
from .models import PortfolioHolding
from .models import PortfolioSnapshot
from .models import Watchlist
from .models import WatchlistCoin
from .models import CoinExchangeInfo

# Register your models here.



admin.site.register(Exchange)
admin.site.register(Coin)
admin.site.register(Portfolio)
admin.site.register(PortfolioHolding)
admin.site.register(PortfolioSnapshot)
admin.site.register(Watchlist)
admin.site.register(CoinExchangeInfo)
admin.site.register(WatchlistCoin)