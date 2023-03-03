from django.urls import path, include

from . import views

urlpatterns = [
    path('account/', include('account.urls')),

    path('exchanges/', views.ExchangeListAPIView.as_view(), name='get-exchanges'),
    path('exchanges/<slug:slug>/', views.ExchangeRetrieveAPIView.as_view(),
         name='get-exchange'),

    path('coins/', views.CoinListAPIView.as_view(), name='get-coins'),

    path('portfolios/', views.PortfolioListCreateAPIView.as_view(),
         name='get-create-portfolios'),
    path('portfolios/<str:pk>/', views.PortfolioRetrieveUpdateDestroyAPIView.as_view(),
         name='get-delete-update-portfolio'),

    path('portfolio_holdings/', views.PortfolioHoldingCreateAPIView.as_view(),
         name='get-portfolio-holdings'),
    path('portfolio_holdings/<str:pk>/', views.PortfolioHoldingRetrieveUpdateDestroyAPIView.as_view(),
         name='get-delete-update-portfolio-holding'),

    path('watchlists/', views.WatchlistListCreateAPIView.as_view(),
         name='get-create-portfolio-holdings'),
    path('watchlists/<str:pk>/', views.WatchlisRetrievetUpdateDestroyAPIView.as_view(),
         name='retrieve-delete-update-portfolio-holding'),

    path('portfolios/<str:pk>/holdings/', views.PortfolioHoldingsByPortfolioAPIView.as_view(),
         name='get-portfolio-holdings-by-portfolio-id'),
    path('portfolios/<str:pk>/snapshots/', views.PortfolioSnapshotListAPIView.as_view(),
         name='portfolio_snapshots'),

    path('history-prices/<slug:exchange_slug>/<slug:coin_slug>/',
         views.CoinExchangeHistoryAPIView.as_view(), name='history-prices'),
    path('trending/', views.TrendingCoinsAPIView.as_view(), name='trending-coins'),

]
