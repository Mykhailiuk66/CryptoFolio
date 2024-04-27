from django.urls import path, include

from . import views

urlpatterns = [
    path('account/', include('account.urls')),

    path('exchanges/', views.ExchangeListAPIView.as_view(), name='get-exchanges'),
    path('coins/', views.CoinListAPIView.as_view(), name='get-coins'),

    path('watchlists/', views.WatchlistListCreateAPIView.as_view(), name='get-create-portfolio-holdings'),
    path('watchlists/<str:pk>/', views.WatchlistRetrievetUpdateDestroyAPIView.as_view(), name='retrieve-delete-update-portfolio-holding'),

    path('watchlist-coin/', views.WatchlistCoinCreateAPIView.as_view(), name='create-watchlist-coin'),
    path('watchlist-coin/<str:pk>/', views.WatchlistCoinDestroyAPIView.as_view(), name='delete-watchlist-coin'),

    path('portfolios/', views.PortfolioListCreateAPIView.as_view(), name='get-create-portfolios'),
    path('portfolios/<str:pk>/', views.PortfolioUpdateDestroyAPIView.as_view(), name='delete-update-portfolio'),

    path('portfolio-holdings/', views.PortfolioHoldingCreateAPIView.as_view(), name='create-portfolio-holdings'),
    path('portfolio-holdings/<str:pk>/', views.PortfolioHoldingRetrieveUpdateDestroyAPIView.as_view(), name='get-delete-update-portfolio-holding'),
    
    path('portfolios/<str:pk>/holdings/', views.PortfolioHoldingsByPortfolioAPIView.as_view(), name='get-portfolio-holdings-by-portfolio-id'),
    path('portfolios/<str:pk>/snapshots/', views.PortfolioSnapshotListAPIView.as_view(), name='portfolio-snapshots'),

    path('coin-exchange-info/', views.CoinExchangeInfoAPIView.as_view(), name='coin-exchange-info'),

    path('history-prices/<slug:exchange_slug>/<slug:coin_slug>/', views.CoinExchangeHistoryAPIView.as_view(), name='history-prices'),
    path('trending/', views.TrendingCoinsAPIView.as_view(), name='trending-coins'),

]
