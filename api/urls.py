from django.urls import path

from . import views

urlpatterns = [
    path('exchanges/', views.ExchangeListAPIView.as_view(), name='get-exchanges'),
    path('exchanges/<int:pk>/', views.ExchangeRetrieveAPIView.as_view(),
         name='get-exchange'),

    path('coins/', views.CoinListAPIView.as_view(), name='get-coins'),
    path('coins/<int:pk>/', views.CoinRetrieveAPIView.as_view(), name='get-coin'),

    path('portfolios/', views.PortfolioListCreateAPIView.as_view(),
         name='get-create-portfolios'),
    path('portfolios/<str:pk>/', views.PortfolioRetrieveUpdateDestroyAPIView.as_view(),
         name='get-delete-update-portfolio'),

    path('portfolio_holdings/', views.PortfolioHoldingListCreateAPIView.as_view(),
         name='get-create-portfolio-holdings'),
    path('portfolio_holdings/<str:pk>/', views.PortfolioHoldingRetrieveUpdateDestroyAPIView.as_view(),
         name='get-delete-update-portfolio-holding'),

    path('portfolio_snapshots/', views.PortfolioSnapshotListCreateAPIView.as_view(),
         name='get-create-portfolio-holdings'), ## ??
    path('portfolio_snapshots/<str:pk>/', views.PortfolioSnapshotgRetrieveUpdateDestroyAPIView.as_view(),
         name='get-delete-update-portfolio-holding'), ## ??

    path('watchlists/', views.WatchlistListCreateAPIView.as_view(),
         name='get-create-portfolio-holdings'),
    path('watchlists/<str:pk>/', views.WatchlistUpdateDestroyAPIView.as_view(),
         name='delete-update-portfolio-holding'),

    path('portfolios/<str:pk>/holdings/', views.PortfolioHoldingsByPortfolioAPIView.as_view(),
         name='get-portfolio-holdings-by-portfolio-id'),
    path('portfolios/<str:pk>/snapshots/', views.PortfolioSnapshotListAPIView.as_view(),
         name='portfolio_snapshots'),

]
